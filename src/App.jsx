import { useState, useEffect } from "react";
import { useChessBoard, PIECES, ORDER } from "./useChessBoard.jsx";
import Dashboard from "./Dashboard.jsx";
import GameConfig from "./GameConfig.jsx";
import "./App.css";

function App() {
	// Constants
	const GAME_STATE_KEY = "chess-game-state";
	const WINNER_KEY = "chess-winner-v1";

	// Helper functions
	const loadWinner = () => {
		try {
			const raw = sessionStorage.getItem(WINNER_KEY);
			if (!raw) return null;
			return JSON.parse(raw);
		} catch {
			return null;
		}
	};
	const [gameState, setGameState] = useState(() => {
		const savedState = sessionStorage.getItem(GAME_STATE_KEY);
		if (savedState) {
			const parsed = JSON.parse(savedState);

			// If game was completed, return to cold state
			if (parsed.isCompleted) {
				sessionStorage.clear();
				return { status: "cold" };
			}

			// If game is in cold state, maintain it
			if (parsed.status === "cold") {
				return { status: "cold" };
			}

			// If game is in progress or paused, restore the state
			if (parsed.status === "warm") {
				// Set game to paused state on refresh when in warm state
				return {
					...parsed,
					showConfig: false,
					isPaused: true, // ensure game starts paused on refresh
				};
			}
		}
		// Default to cold state
		return { status: "cold" };
	});

	// --- Chess logic ---
	const {
		state: board,
		currentPlayer,
		makeMove,
		makePieceSelection,
		highlightedMoves,
		isCheck,
		isMate,
		isStalemate,
	} = useChessBoard({
		persist: gameState.status === "warm",
	});

	// --- Piece selection state for click-to-move ---
	const [selected, setSelected] = useState(null); // {row, col} or null

	// Helper: is this cell a valid move for selected?
	const isMoveTarget = (row, col) =>
		highlightedMoves.some((m) => m.row === row && m.col === col);

	// Handle click on a cell
	const handleCellClick = (cell, row, col) => {
		// Prevent any moves if game is paused
		if (isPaused || gameState.status !== "warm") {
			return;
		}

		// If clicking own piece, always select it (whether first selection or changing selection)
		if (cell.name && cell.color === currentPlayer) {
			makePieceSelection(cell, row);
			setSelected({ row, col, cell });
		}
		// If a piece is already selected
		else if (selected) {
			// If clicking a valid move target, move the piece
			if (isMoveTarget(row, col)) {
				makeMove(cell, row);
				setSelected(null);
			}
			// If clicking anywhere else, deselect
			else {
				setSelected(null);
			}
		}
	};

	// Handle drag start
	const handleDragStart = (cell, row, col) => {
		// Prevent drag if game is paused
		if (isPaused || gameState.status !== "warm") {
			return false;
		}

		if (cell.name && cell.color === currentPlayer) {
			makePieceSelection(cell, row);
			setSelected({ row, col, cell });
		}
	};

	// Handle drop
	const handleDrop = (cell, row, col) => {
		// Prevent drop if game is paused
		if (isPaused || gameState.status !== "warm") {
			return;
		}

		if (selected && isMoveTarget(row, col)) {
			makeMove(cell, row);
		}
		setSelected(null);
	};

	// --- Pause/Resume logic ---
	const [isPaused, setIsPaused] = useState(() => {
		// Game should always start paused on refresh if in warm state
		return gameState.status === "warm" ? true : false;
	});

	const handlePauseResume = () => {
		if (gameState.status === "warm") {
			setIsPaused(!isPaused);
			// Update game state to reflect pause status
			setGameState((prev) => ({
				...prev,
				isPaused: !isPaused,
			}));
		}
	};

	// --- Timer logic ---
	const TIMER_KEY = "chess-timers-v1";
	const DEFAULT_TIME = 600;

	// Try to load from sessionStorage
	const loadTimers = () => {
		try {
			const raw = sessionStorage.getItem(TIMER_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			if (
				parsed &&
				typeof parsed.white === "number" &&
				typeof parsed.black === "number"
			) {
				return parsed;
			}
		} catch {
			// ignore
		}
		return null;
	};

	const [whiteTime, setWhiteTime] = useState(() =>
		gameState.status === "cold"
			? DEFAULT_TIME
			: loadTimers()?.white ?? DEFAULT_TIME
	);
	const [blackTime, setBlackTime] = useState(() =>
		gameState.status === "cold"
			? DEFAULT_TIME
			: loadTimers()?.black ?? DEFAULT_TIME
	);

	// Persist timers on change only in warm state
	useEffect(() => {
		if (gameState.status === "warm") {
			sessionStorage.setItem(
				TIMER_KEY,
				JSON.stringify({ white: whiteTime, black: blackTime })
			);
		}
	}, [whiteTime, blackTime, gameState.status]);

	// --- Winner logic (persisted) ---
	const [winner, setWinnerState] = useState(loadWinner());
	// Persist winner on change
	useEffect(() => {
		sessionStorage.setItem(WINNER_KEY, JSON.stringify(winner));
	}, [winner]);
	// If a timer runs out, declare the opponent as winner
	const handleTimeout = (color) => {
		setWinnerState(color === "white" ? "Black" : "White");
	};
	// If a checkmate or stalemate occurs, clear winner
	useEffect(() => {
		if (isMate || isStalemate) setWinnerState(null);
	}, [isMate, isStalemate]);

	// Save game state to sessionStorage whenever it changes
	useEffect(() => {
		sessionStorage.setItem(
			GAME_STATE_KEY,
			JSON.stringify({
				...gameState,
				isCompleted: isMate || isStalemate || winner !== null,
			})
		);
	}, [gameState, isMate, isStalemate, winner]);

	// --- Restart logic ---
	const handleRestart = () => {
		// Clear all sessionStorage to ensure all chess state is wiped
		sessionStorage.clear();
		setGameState({ status: "cold" });
		setWhiteTime(DEFAULT_TIME);
		setBlackTime(DEFAULT_TIME);
		setWinnerState(null);
		setIsPaused(false);
		window.location.reload(); // reload to fully reset all state
	};

	const handleGameConfig = (config) => {
		setGameState({
			status: "warm",
			players: {
				white:
					config.player1.color === "white"
						? config.player1.name
						: config.player2.name,
				black:
					config.player1.color === "white"
						? config.player2.name
						: config.player1.name,
			},
			timerDuration: config.timerDuration,
		});
		setWhiteTime(config.timerDuration);
		setBlackTime(config.timerDuration);
		setIsPaused(false);
	};

	const handleConfigCancel = () => {
		setGameState({ status: "cold" });
	};

	// --- Render ---
	return (
		<div>
			<div className="app">
				<div className="dashboard-container">
					<h1>Invite & Play!</h1>
					<Dashboard
						currentPlayerDisplay={
							gameState.status === "warm"
								? `${gameState.players?.[currentPlayer]} (${currentPlayer})`
								: "Player #"
						}
						currentPlayer={currentPlayer}
						isCheck={isCheck}
						isMate={isMate}
						isStalemate={isStalemate}
						winner={winner}
						whiteTime={whiteTime}
						setWhiteTime={setWhiteTime}
						blackTime={blackTime}
						setBlackTime={setBlackTime}
						handleTimeout={handleTimeout}
						isPaused={isPaused}
						gameState={gameState}
					/>
					<div className="game-controls">
						{gameState.status === "cold" ? (
							<button
								className="control-button start-button"
								onClick={() =>
									setGameState({
										...gameState,
										showConfig: true,
									})
								}
							>
								Start Game
							</button>
						) : (
							<>
								<button
									className="control-button reset-button"
									onClick={handleRestart}
								>
									Reset Game
								</button>
								{!winner && (
									<button
										className={`control-button ${
											isPaused
												? "resume-button"
												: "pause-button"
										}`}
										onClick={handlePauseResume}
									>
										{isPaused
											? "Resume Game"
											: "Pause Game"}
									</button>
								)}
							</>
						)}
					</div>
				</div>
				{gameState.showConfig && (
					<GameConfig
						onSubmit={handleGameConfig}
						onCancel={handleConfigCancel}
					/>
				)}
				<div
					className={`board-container ${
						isPaused ? "board-paused" : ""
					}`}
				>
					<table className="board fixed-board">
						<thead>
							<tr>
								<th className="col-label-spacer"></th>
								{ORDER.map((colId) => (
									<th key={colId} className="col-label">
										{String.fromCharCode(96 + colId)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{(() => {
								const reversed = [...ORDER].reverse();
								return reversed.map((rowId, index) => (
									<tr key={index + 1}>
										<th className="row-label">{rowId}</th>
										{ORDER.map((colId) => {
											const cell = board[rowId][colId];
											const move = highlightedMoves.find(
												(m) =>
													m.row === rowId &&
													m.col === colId
											);
											const isCapture = move?.isCapture;
											const isHighlight = !!move;
											const isSelected =
												selected &&
												selected.row === rowId &&
												selected.col === colId;
											return (
												<td
													key={colId}
													className={
														(cell.name
															? cell.color
															: "") +
														(isHighlight
															? isCapture
																? " highlight-capture"
																: " highlight-move"
															: "") +
														(isSelected
															? " selected-piece"
															: "") +
														(isHighlight
															? " show-dot"
															: "")
													}
													style={{
														aspectRatio: "1 / 1",
													}}
													onClick={() =>
														handleCellClick(
															cell,
															rowId,
															colId
														)
													}
													onDragStart={
														cell.name &&
														cell.color ===
															currentPlayer
															? () =>
																	handleDragStart(
																		cell,
																		rowId,
																		colId
																	)
															: undefined
													}
													draggable={
														!!cell.name &&
														cell.color ===
															currentPlayer
													}
													onDragOver={(e) => {
														e.preventDefault();
													}}
													onDrop={() =>
														handleDrop(
															cell,
															rowId,
															colId
														)
													}
												>
													{cell.name && (
														<span className="piece piece-anim">
															{PIECES[
																cell.color
															]?.[cell.name] ||
																""}
														</span>
													)}
												</td>
											);
										})}
									</tr>
								));
							})()}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;
