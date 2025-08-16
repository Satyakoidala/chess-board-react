import { useState, useEffect } from "react";
import { useChessBoard, PIECES, ORDER } from "./useChessBoard.jsx";
import Dashboard from "./Dashboard.jsx";
import "./App.css";

function App() {
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
		persist: true,
	});

	// --- Piece selection state for click-to-move ---
	const [selected, setSelected] = useState(null); // {row, col} or null

	// Helper: is this cell a valid move for selected?
	const isMoveTarget = (row, col) =>
		highlightedMoves.some((m) => m.row === row && m.col === col);

	// Handle click on a cell
	const handleCellClick = (cell, row, col) => {
		// Prevent any moves if game is paused
		if (isPaused) {
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
		if (isPaused) {
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
		if (isPaused) {
			return;
		}

		if (selected && isMoveTarget(row, col)) {
			makeMove(cell, row);
		}
		setSelected(null);
	};

	// --- Pause/Resume logic ---
	const PAUSE_KEY = "chess-game-paused";
	const [isPaused, setIsPaused] = useState(() => {
		const pauseState = localStorage.getItem(PAUSE_KEY);
		return pauseState ? JSON.parse(pauseState) : false;
	});

	// Persist pause state
	useEffect(() => {
		localStorage.setItem(PAUSE_KEY, JSON.stringify(isPaused));
	}, [isPaused]);

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	// --- Timer logic ---
	const TIMER_KEY = "chess-timers-v1";
	const DEFAULT_TIME = 600;
	// Try to load from localStorage
	const loadTimers = () => {
		try {
			const raw = localStorage.getItem(TIMER_KEY);
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
	const persisted = loadTimers();

	const [whiteTime, setWhiteTime] = useState(
		persisted?.white ?? DEFAULT_TIME
	);
	const [blackTime, setBlackTime] = useState(
		persisted?.black ?? DEFAULT_TIME
	);
	// Persist timers on change
	useEffect(() => {
		localStorage.setItem(
			TIMER_KEY,
			JSON.stringify({ white: whiteTime, black: blackTime })
		);
	}, [whiteTime, blackTime]);

	// --- Winner logic (persisted) ---
	const WINNER_KEY = "chess-winner-v1";
	const loadWinner = () => {
		try {
			const raw = localStorage.getItem(WINNER_KEY);
			if (!raw) return null;
			return JSON.parse(raw);
		} catch {
			return null;
		}
	};
	const [winner, setWinnerState] = useState(loadWinner());
	// Persist winner on change
	useEffect(() => {
		localStorage.setItem(WINNER_KEY, JSON.stringify(winner));
	}, [winner]);
	// If a timer runs out, declare the opponent as winner
	const handleTimeout = (color) => {
		setWinnerState(color === "white" ? "Black" : "White");
	};
	// If a checkmate or stalemate occurs, clear winner
	useEffect(() => {
		if (isMate || isStalemate) setWinnerState(null);
	}, [isMate, isStalemate]);

	// --- Restart logic ---
	const handleRestart = () => {
		// Clear all localStorage to ensure all chess state is wiped
		localStorage.clear();
		window.location.reload(); // reload to fully reset all state
	};

	// --- Render ---
	const gameStarted = Object.values(board).some((row) =>
		Object.values(row).some((cell) => cell.name)
	);
	return (
		<div>
			<div className="app">
				<div className="dashboard-container">
					<h1>Chess Game</h1>
					<Dashboard
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
					/>
					{gameStarted && (
						<div className="game-controls">
							<button
								style={{
									margin: "2.5rem 0.5rem 1.5rem",
									display: "inline-block",
									fontSize: "1.2rem",
									fontWeight: 700,
									padding: "0.7em 2.2em",
									borderRadius: "0.5em",
									background: "#ffe066",
									color: "#222",
									border: "none",
									boxShadow: "0 2px 8px #0002",
									cursor: "pointer",
									letterSpacing: "0.04em",
								}}
								onClick={handleRestart}
							>
								Restart Game
							</button>
							<button
								style={{
									margin: "2.5rem 0.5rem 1.5rem",
									display: "inline-block",
									fontSize: "1.2rem",
									fontWeight: 700,
									padding: "0.7em 2.2em",
									borderRadius: "0.5em",
									background: isPaused
										? "#4CAF50"
										: "#f44336",
									color: "#fff",
									border: "none",
									boxShadow: "0 2px 8px #0002",
									cursor: "pointer",
									letterSpacing: "0.04em",
								}}
								onClick={handlePauseResume}
							>
								{isPaused ? "Resume Game" : "Pause Game"}
							</button>
						</div>
					)}
				</div>
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
														<span
															className="piece-anim"
															style={{
																fontFamily:
																	"Arial Unicode MS, Segoe UI Symbol, sans-serif",
																fontWeight: 700,
																fontSize:
																	"2.2rem",
																lineHeight: 1,
																display:
																	"inline-block",
															}}
														>
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
