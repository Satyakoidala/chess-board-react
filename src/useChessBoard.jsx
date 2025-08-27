import { useEffect, useReducer, useRef, useState } from "react";

// Local storage keys
const CURRENT_PLAYER_KEY = "chess-current-player";

// Solid Unicode chess piece icons for dark theme, by color
export const PIECES = {
	white: {
		king: "\u265A", // ♚
		queen: "\u265B", // ♛
		rook: "\u265C", // ♜
		bishop: "\u265D", // ♝
		knight: "\u265E", // ♞
		soldier: "\u265F", // ♟
	},
	black: {
		king: "\u265A", // ♚
		queen: "\u265B", // ♛
		rook: "\u265C", // ♜
		bishop: "\u265D", // ♝
		knight: "\u265E", // ♞
		soldier: "\u265F", // ♟
	},
};

export const ORDER = [1, 2, 3, 4, 5, 6, 7, 8];

// Add castling and en passant tracking
const INIT_STATE = {
	1: {
		1: {
			name: "rook",
			color: "white",
			position: 1,
		},
		2: {
			name: "knight",
			color: "white",
			position: 2,
		},
		3: {
			name: "bishop",
			color: "white",
			position: 3,
		},
		4: {
			name: "queen",
			color: "white",
			position: 4,
		},
		5: {
			name: "king",
			color: "white",
			position: 5,
		},
		6: {
			name: "bishop",
			color: "white",
			position: 6,
		},
		7: {
			name: "knight",
			color: "white",
			position: 7,
		},
		8: {
			name: "rook",
			color: "white",
			position: 8,
		},
	},
	2: {
		1: {
			name: "soldier",
			color: "white",
			position: 1,
		},
		2: {
			name: "soldier",
			color: "white",
			position: 2,
		},
		3: {
			name: "soldier",
			color: "white",
			position: 3,
		},
		4: {
			name: "soldier",
			color: "white",
			position: 4,
		},
		5: {
			name: "soldier",
			color: "white",
			position: 5,
		},
		6: {
			name: "soldier",
			color: "white",
			position: 6,
		},
		7: {
			name: "soldier",
			color: "white",
			position: 7,
		},
		8: {
			name: "soldier",
			color: "white",
			position: 8,
		},
	},
	3: {
		1: {
			name: null,
			color: null,
			position: 1,
		},
		2: {
			name: null,
			color: null,
			position: 2,
		},
		3: {
			name: null,
			color: null,
			position: 3,
		},
		4: {
			name: null,
			color: null,
			position: 4,
		},
		5: {
			name: null,
			color: null,
			position: 5,
		},
		6: {
			name: null,
			color: null,
			position: 6,
		},
		7: {
			name: null,
			color: null,
			position: 7,
		},
		8: {
			name: null,
			color: null,
			position: 8,
		},
	},
	4: {
		1: {
			name: null,
			color: null,
			position: 1,
		},
		2: {
			name: null,
			color: null,
			position: 2,
		},
		3: {
			name: null,
			color: null,
			position: 3,
		},
		4: {
			name: null,
			color: null,
			position: 4,
		},
		5: {
			name: null,
			color: null,
			position: 5,
		},
		6: {
			name: null,
			color: null,
			position: 6,
		},
		7: {
			name: null,
			color: null,
			position: 7,
		},
		8: {
			name: null,
			color: null,
			position: 8,
		},
	},
	5: {
		1: {
			name: null,
			color: null,
			position: 1,
		},
		2: {
			name: null,
			color: null,
			position: 2,
		},
		3: {
			name: null,
			color: null,
			position: 3,
		},
		4: {
			name: null,
			color: null,
			position: 4,
		},
		5: {
			name: null,
			color: null,
			position: 5,
		},
		6: {
			name: null,
			color: null,
			position: 6,
		},
		7: {
			name: null,
			color: null,
			position: 7,
		},
		8: {
			name: null,
			color: null,
			position: 8,
		},
	},
	6: {
		1: {
			name: null,
			color: null,
			position: 1,
		},
		2: {
			name: null,
			color: null,
			position: 2,
		},
		3: {
			name: null,
			color: null,
			position: 3,
		},
		4: {
			name: null,
			color: null,
			position: 4,
		},
		5: {
			name: null,
			color: null,
			position: 5,
		},
		6: {
			name: null,
			color: null,
			position: 6,
		},
		7: {
			name: null,
			color: null,
			position: 7,
		},
		8: {
			name: null,
			color: null,
			position: 8,
		},
	},
	7: {
		1: {
			name: "soldier",
			color: "black",
			position: 1,
		},
		2: {
			name: "soldier",
			color: "black",
			position: 2,
		},
		3: {
			name: "soldier",
			color: "black",
			position: 3,
		},
		4: {
			name: "soldier",
			color: "black",
			position: 4,
		},
		5: {
			name: "soldier",
			color: "black",
			position: 5,
		},
		6: {
			name: "soldier",
			color: "black",
			position: 6,
		},
		7: {
			name: "soldier",
			color: "black",
			position: 7,
		},
		8: {
			name: "soldier",
			color: "black",
			position: 8,
		},
	},
	8: {
		1: {
			name: "rook",
			color: "black",
			position: 1,
		},
		2: {
			name: "knight",
			color: "black",
			position: 2,
		},
		3: {
			name: "bishop",
			color: "black",
			position: 3,
		},
		4: {
			name: "queen",
			color: "black",
			position: 4,
		},
		5: {
			name: "king",
			color: "black",
			position: 5,
		},
		6: {
			name: "bishop",
			color: "black",
			position: 6,
		},
		7: {
			name: "knight",
			color: "black",
			position: 7,
		},
		8: {
			name: "rook",
			color: "black",
			position: 8,
		},
	},
};

// Add castling, en passant, and promotion logic
const reducer = (state, action) => {
	const { type, selectPiece, targetPiece, special, promotion } = action;
	let newState = JSON.parse(JSON.stringify(state));
	switch (type) {
		case "MAKE_A_MOVE": {
			// Remove piece from source
			newState[selectPiece.row][selectPiece.position].name = null;
			newState[selectPiece.row][selectPiece.position].color = null;
			// Handle en passant
			if (special && special.type === "enpassant") {
				const capRow =
					selectPiece.color === "white"
						? targetPiece.row - 1
						: targetPiece.row + 1;
				newState[capRow][targetPiece.position].name = null;
				newState[capRow][targetPiece.position].color = null;
			}
			// Handle castling
			if (special && special.type === "castle") {
				// Move rook
				if (targetPiece.position === 7) {
					// kingside
					newState[selectPiece.row][8].name = null;
					newState[selectPiece.row][8].color = null;
					newState[selectPiece.row][6].name = "rook";
					newState[selectPiece.row][6].color = selectPiece.color;
				} else if (targetPiece.position === 3) {
					// queenside
					newState[selectPiece.row][1].name = null;
					newState[selectPiece.row][1].color = null;
					newState[selectPiece.row][4].name = "rook";
					newState[selectPiece.row][4].color = selectPiece.color;
				}
			}
			// Place piece at target
			newState[targetPiece.row][targetPiece.position].name =
				promotion || selectPiece.name;
			newState[targetPiece.row][targetPiece.position].color =
				selectPiece.color;
			// Track last move for en passant
			newState.lastMove = {
				from: { row: selectPiece.row, col: selectPiece.position },
				to: { row: targetPiece.row, col: targetPiece.position },
				piece: selectPiece.name,
				color: selectPiece.color,
			};
			// Track castling rights (not implemented in state, but could be added)
			return newState;
		}
		default:
			return state;
	}
};

// Pawn move logic with promotion, en passant
const checkSoldierMove = (state, S, T, enPassantSquare = null) => {
	const [x1, y1, x2, y2] = [S.row, S.position, T.row, T.position];
	const direction = S.color === "white" ? 1 : -1;
	const startRow = S.color === "white" ? 2 : 7;
	// Forward move
	if (y1 === y2 && x2 - x1 === direction && state[x2][y2].name === null) {
		return { valid: true };
	}
	// Double move from start
	if (
		y1 === y2 &&
		x1 === startRow &&
		x2 - x1 === 2 * direction &&
		state[x1 + direction][y2].name === null &&
		state[x2][y2].name === null
	) {
		return { valid: true, double: true };
	}
	// Capture
	if (
		Math.abs(y2 - y1) === 1 &&
		x2 - x1 === direction &&
		state[x2][y2].name !== null &&
		state[x2][y2].color !== S.color
	) {
		return { valid: true };
	}
	// En passant
	if (
		Math.abs(y2 - y1) === 1 &&
		x2 - x1 === direction &&
		state[x2][y2].name === null &&
		enPassantSquare &&
		enPassantSquare.row === x2 &&
		enPassantSquare.col === y2
	) {
		return { valid: true, enpassant: true };
	}
	return { valid: false };
};

const checkKnightMove = (state, S, T) => {
	const [x1, y1, x2, y2] = [S.row, S.position, T.row, T.position];
	const possibleMoves = [
		[x1 + 2, y1 + 1],
		[x1 - 2, y1 + 1],
		[x1 + 1, y1 + 2],
		[x1 - 1, y1 + 2],
		[x1 + 2, y1 - 1],
		[x1 - 2, y1 - 1],
		[x1 + 1, y1 - 2],
		[x1 - 1, y1 - 2],
	];
	return possibleMoves.some(
		([r, c]) => r === x2 && c === y2 && r > 0 && r <= 8 && c > 0 && c <= 8
	);
};

const checkRookMove = (state, S, T) => {
	const [x1, y1, x2, y2] = [S.row, S.position, T.row, T.position];
	if (x1 !== x2 && y1 !== y2) return false;
	// Check path is clear
	if (x1 === x2) {
		const [min, max] = [Math.min(y1, y2) + 1, Math.max(y1, y2) - 1];
		for (let y = min; y <= max; y++) {
			if (state[x1][y].name !== null) return false;
		}
	} else {
		const [min, max] = [Math.min(x1, x2) + 1, Math.max(x1, x2) - 1];
		for (let x = min; x <= max; x++) {
			if (state[x][y1].name !== null) return false;
		}
	}
	return true;
};

const checkBishopMove = (state, S, T) => {
	const [x1, y1, x2, y2] = [S.row, S.position, T.row, T.position];
	if (Math.abs(x2 - x1) !== Math.abs(y2 - y1)) return false;
	const dx = x2 > x1 ? 1 : -1;
	const dy = y2 > y1 ? 1 : -1;
	let x = x1 + dx,
		y = y1 + dy;
	while (x !== x2 && y !== y2) {
		if (state[x][y].name !== null) return false;
		x += dx;
		y += dy;
	}
	return true;
};

const checkQueenMove = (state, S, T) => {
	return checkRookMove(state, S, T) || checkBishopMove(state, S, T);
};

const checkKingMove = (state, S, T) => {
	const [x1, y1, x2, y2] = [S.row, S.position, T.row, T.position];
	return Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1;
};

// Key for sessionStorage
const STORAGE_KEY = "chess-board-state-v1";

export const useChessBoard = () => {
	// Load from sessionStorage if available
	const loadPersisted = () => {
		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			// Defensive: ensure board and player exist
			if (parsed && parsed.board && parsed.currentPlayer) {
				return parsed;
			}
		} catch {
			// Ignore JSON parse/storage errors
		}
		return null;
	};

	const persisted = loadPersisted();
	const [state, dispatch] = useReducer(
		reducer,
		persisted?.board || INIT_STATE
	);
	const [currentPlayer, setCurrentPlayer] = useState(
		persisted?.currentPlayer || "white"
	);
	const selectPiece = useRef(null);

	// Save to sessionStorage on state or player change
	useEffect(() => {
		sessionStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ board: state, currentPlayer })
		);
	}, [state, currentPlayer]);

	useEffect(() => {
		selectPiece.current = null;
	}, [currentPlayer]);

	// Castling logic
	const canCastle = (state, color, side) => {
		const row = color === "white" ? 1 : 8;
		// Check king and rook have not moved, path is clear, not in check, not passing through check
		// For simplicity, assume king/rook have not moved if they're in their original positions
		if (state[row][5].name !== "king" || state[row][5].color !== color)
			return false;
		if (side === "kingside") {
			if (state[row][8].name !== "rook" || state[row][8].color !== color)
				return false;
			if (state[row][6].name || state[row][7].name) return false;
			// TODO: Check squares 5,6,7 for check
			return true;
		} else {
			if (state[row][1].name !== "rook" || state[row][1].color !== color)
				return false;
			if (state[row][2].name || state[row][3].name || state[row][4].name)
				return false;
			// TODO: Check squares 5,4,3 for check
			return true;
		}
	};

	const checkPattern = (
		S,
		T,
		stateOverride = null,
		enPassantSquare = null
	) => {
		const board = stateOverride || state;
		switch (S.name) {
			case "soldier":
				return checkSoldierMove(board, S, T, enPassantSquare);
			case "knight":
				return { valid: checkKnightMove(board, S, T) };
			case "rook":
				return { valid: checkRookMove(board, S, T) };
			case "bishop":
				return { valid: checkBishopMove(board, S, T) };
			case "queen":
				return { valid: checkQueenMove(board, S, T) };
			case "king":
				// Castling
				if (
					Math.abs(S.position - T.position) === 2 &&
					S.row === T.row
				) {
					if (
						T.position === 7 &&
						canCastle(board, S.color, "kingside")
					)
						return { valid: true, castle: "kingside" };
					if (
						T.position === 3 &&
						canCastle(board, S.color, "queenside")
					)
						return { valid: true, castle: "queenside" };
					return { valid: false };
				}
				return { valid: checkKingMove(board, S, T) };
			default:
				return { valid: false };
		}
	};

	// Check if move leaves king in check
	const isKingInCheck = (state, color) => {
		// Find king position
		let kingPos = null;
		for (let row = 1; row <= 8; row++) {
			for (let col = 1; col <= 8; col++) {
				const cell = state[row][col];
				if (cell.name === "king" && cell.color === color) {
					kingPos = { row, col };
				}
			}
		}
		if (!kingPos) return false;
		// Check if any enemy piece can move to king
		for (let row = 1; row <= 8; row++) {
			for (let col = 1; col <= 8; col++) {
				const cell = state[row][col];
				if (cell.name && cell.color !== color) {
					const S = { ...cell, row, position: col };
					const T = {
						...state[kingPos.row][kingPos.col],
						row: kingPos.row,
						position: kingPos.col,
					};
					if (checkPattern(S, T, state).valid) {
						return true;
					}
				}
			}
		}
		return false;
	};

	const cloneState = (state) => JSON.parse(JSON.stringify(state));

	// En passant square
	let enPassantSquare = null;

	const isValidMove = (S, T, promotion = null) => {
		if (S.color === T.color) return false;
		if (S.position === T.position && S.row === T.row) return false;
		const pattern = checkPattern(S, T, null, enPassantSquare);
		if (!pattern.valid) return false;
		// Simulate move and check for king safety
		const tempState = cloneState(state);
		tempState[S.row][S.position].name = null;
		tempState[S.row][S.position].color = null;
		tempState[T.row][T.position].name = promotion || S.name;
		tempState[T.row][T.position].color = S.color;
		// Remove captured pawn for en passant
		if (pattern.enpassant) {
			const capRow = S.color === "white" ? T.row - 1 : T.row + 1;
			tempState[capRow][T.position].name = null;
			tempState[capRow][T.position].color = null;
		}
		// Move rook for castling
		if (pattern.castle) {
			if (T.position === 7) {
				tempState[S.row][8].name = null;
				tempState[S.row][8].color = null;
				tempState[S.row][6].name = "rook";
				tempState[S.row][6].color = S.color;
			} else if (T.position === 3) {
				tempState[S.row][1].name = null;
				tempState[S.row][1].color = null;
				tempState[S.row][4].name = "rook";
				tempState[S.row][4].color = S.color;
			}
		}
		if (isKingInCheck(tempState, S.color)) return false;
		return true;
	};

	// For animation/highlighting: get all valid moves for a piece
	const getValidMoves = (piece) => {
		if (!piece || !piece.name) return [];
		const moves = [];
		for (let row = 1; row <= 8; row++) {
			for (let col = 1; col <= 8; col++) {
				const target = state[row][col];
				if (isValidMove({ ...piece }, { ...target, row })) {
					// Check if this is a capture move
					const isCapture =
						target.name !== null && target.color !== piece.color;
					moves.push({ row, col, isCapture });
				}
			}
		}
		return moves;
	};

	const toggleCurrentPlayer = (player) => {
		if (player === "white") setCurrentPlayer("black");
		else setCurrentPlayer("white");
	};

	const [highlightedMoves, setHighlightedMoves] = useState([]);
	const makePieceSelection = ({ name, color, position }, rowIndex) => {
		if (currentPlayer === color) {
			const piece = { name, color, position, row: rowIndex };
			selectPiece.current = piece;
			setHighlightedMoves(getValidMoves(piece));
		}
	};

	// Persist current player to sessionStorage
	useEffect(() => {
		if (currentPlayer) {
			sessionStorage.setItem(CURRENT_PLAYER_KEY, currentPlayer);
		}
	}, [currentPlayer]);

	// Initialize current player from sessionStorage or default to white
	useEffect(() => {
		const savedPlayer = sessionStorage.getItem(CURRENT_PLAYER_KEY);
		if (savedPlayer) {
			setCurrentPlayer(savedPlayer);
		}
	}, []);

	// Pawn promotion UI (simple prompt for now)
	const makeMove = (targetCell, targetRowId) => {
		if (!selectPiece.current) {
			return;
		}
		const S = selectPiece.current;
		const T = {
			...targetCell,
			row: targetRowId,
		};
		// Promotion
		if (
			S.name === "soldier" &&
			((S.color === "white" && T.row === 8) ||
				(S.color === "black" && T.row === 1))
		) {
			let promotion = window.prompt(
				"Promote to (queen, rook, bishop, knight):",
				"queen"
			);
			if (!["queen", "rook", "bishop", "knight"].includes(promotion))
				promotion = "queen";
			if (isValidMove(S, T, promotion)) {
				dispatch({
					type: "MAKE_A_MOVE",
					selectPiece: S,
					targetPiece: { ...T, name: promotion },
					promotion,
				});
				setHighlightedMoves([]);
				toggleCurrentPlayer(currentPlayer);
			}
			return;
		}
		// En passant
		const pattern = checkPattern(S, T, null, enPassantSquare);
		if (pattern.enpassant && isValidMove(S, T)) {
			dispatch({
				type: "MAKE_A_MOVE",
				selectPiece: S,
				targetPiece: T,
				special: { type: "enpassant" },
			});
			setHighlightedMoves([]);
			toggleCurrentPlayer(currentPlayer);
			return;
		}
		// Castling
		if (pattern.castle && isValidMove(S, T)) {
			dispatch({
				type: "MAKE_A_MOVE",
				selectPiece: S,
				targetPiece: T,
				special: { type: "castle" },
			});
			setHighlightedMoves([]);
			toggleCurrentPlayer(currentPlayer);
			return;
		}
		// Normal move
		if (isValidMove(S, T)) {
			dispatch({
				type: "MAKE_A_MOVE",
				selectPiece: S,
				targetPiece: T,
			});
			setHighlightedMoves([]);
			toggleCurrentPlayer(currentPlayer);
		}
	};

	// Checkmate and stalemate detection
	const hasLegalMoves = (color) => {
		for (let row = 1; row <= 8; row++) {
			for (let col = 1; col <= 8; col++) {
				const cell = state[row][col];
				if (cell.name && cell.color === color) {
					for (let r = 1; r <= 8; r++) {
						for (let c = 1; c <= 8; c++) {
							if (
								isValidMove(
									{ ...cell, row, position: col },
									{ ...state[r][c], row: r, position: c }
								)
							) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};

	// Expose check, checkmate, stalemate
	const isCheck = isKingInCheck(state, currentPlayer);
	const isMate = !hasLegalMoves(currentPlayer) && isCheck;
	const isStalemate = !hasLegalMoves(currentPlayer) && !isCheck;

	return {
		state,
		currentPlayer,
		setCurrentPlayer,
		makePieceSelection,
		makeMove,
		highlightedMoves,
		isCheck,
		isMate,
		isStalemate,
	};
};
