import Timer from "./Timer.jsx";
import PropTypes from "prop-types";

function Dashboard({
	currentPlayerDisplay,
	currentPlayer,
	isCheck,
	isMate,
	isStalemate,
	winner,
	whiteTime,
	setWhiteTime,
	blackTime,
	setBlackTime,
	handleTimeout,
	isPaused,
	gameState,
}) {
	return (
		<aside className="dashboard">
			<h2>Current Player</h2>
			<div className="current-player-label">{currentPlayerDisplay}</div>
			{isCheck && !isMate && <div className="status check">Check!</div>}
			{isMate && (
				<div className="status mate">
					Checkmate! {currentPlayer === "white" ? "Black" : "White"}{" "}
					wins.
				</div>
			)}
			{isStalemate && (
				<div className="status stalemate">Stalemate! Draw.</div>
			)}
			{winner && (
				<div className="status mate">{winner} wins by timeout!</div>
			)}
			<h2>Timer</h2>
			<div className="timer">
				<Timer
					pause={
						!!winner || // Game over by timeout
						gameState.status !== "warm" || // Not in active game
						currentPlayer !== "white" || // Not white's turn
						isPaused // Global pause (needs to be last to allow resume)
					}
					color="white"
					time={whiteTime}
					setTime={setWhiteTime}
					onTimeout={() => handleTimeout("white")}
				/>
				<Timer
					pause={
						!!winner || // Game over by timeout
						gameState.status !== "warm" || // Not in active game
						currentPlayer !== "black" || // Not black's turn
						isPaused // Global pause (needs to be last to allow resume)
					}
					color="black"
					time={blackTime}
					setTime={setBlackTime}
					onTimeout={() => handleTimeout("black")}
				/>
			</div>
		</aside>
	);
}

Dashboard.propTypes = {
	currentPlayerDisplay: PropTypes.string.isRequired,
	currentPlayer: PropTypes.oneOf(["white", "black", undefined]).isRequired,
	isCheck: PropTypes.bool.isRequired,
	isMate: PropTypes.bool.isRequired,
	isStalemate: PropTypes.bool.isRequired,
	winner: PropTypes.string,
	whiteTime: PropTypes.number.isRequired,
	setWhiteTime: PropTypes.func.isRequired,
	blackTime: PropTypes.number.isRequired,
	setBlackTime: PropTypes.func.isRequired,
	handleTimeout: PropTypes.func.isRequired,
	isPaused: PropTypes.bool.isRequired,
	gameState: PropTypes.shape({
		status: PropTypes.oneOf(["cold", "warm"]).isRequired,
	}).isRequired,
};

export default Dashboard;
