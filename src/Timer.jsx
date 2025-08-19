import CountdownTimer from "./CountDownTimer.jsx";
import PropTypes from "prop-types";

// Timer now takes color and currentPlayer to style background/text
function Timer({ pause = true, color, time, setTime, onTimeout }) {
	// Timer should be running when not paused
	const isRunning = !pause;

	// Apply appropriate styling classes based on color and running state
	const bgClass = `timer-${color}`;
	const textClass =
		color === "white" ? "timer-text-black" : "timer-text-white";

	return (
		<div className={`timer-box ${isRunning ? bgClass : "timer-paused"}`}>
			<CountdownTimer
				isPaused={pause}
				textClass={isRunning ? textClass : "timer-text-paused"}
				time={time}
				setTime={setTime}
				onTimeout={onTimeout}
			/>
		</div>
	);
}

Timer.propTypes = {
	pause: PropTypes.bool,
	color: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
	setTime: PropTypes.func.isRequired,
	onTimeout: PropTypes.func,
};

export default Timer;
