import Timer from "./Timer.jsx";
import PropTypes from "prop-types";

function Dashboard({
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
}) {
	return (
		<aside className="dashboard">
			<h2>Current Player</h2>
			<div className="current-player-label">{currentPlayer}</div>
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
					pause={currentPlayer === "black" || !!winner}
					color="white"
					time={whiteTime}
					setTime={setWhiteTime}
					onTimeout={() => handleTimeout("white")}
					globalPause={isPaused}
				/>
				<Timer
					pause={currentPlayer === "white" || !!winner}
					color="black"
					time={blackTime}
					setTime={setBlackTime}
					onTimeout={() => handleTimeout("black")}
					globalPause={isPaused}
				/>
			</div>
		</aside>
	);
}

Dashboard.propTypes = {
	currentPlayer: PropTypes.string.isRequired,
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
};

export default Dashboard;
