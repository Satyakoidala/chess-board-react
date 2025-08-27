import CountdownTimer from "./CountDownTimer.jsx";
import PropTypes from "prop-types";

// Timer now takes color and currentPlayer to style background/text
function Timer({ pause = true, color, time, setTime, onTimeout }) {
	// Timer should be running when not paused
	const isRunning = !pause;

	// Check for low time (less than 30 seconds)
	const isLowTime = time <= 30;

	// Apply appropriate styling classes based on color and running state
	const classes = [
		"timer-box",
		`timer-${color}`,
		!isRunning && "timer-paused",
		isRunning && isLowTime && "timer-low-time",
	]
		.filter(Boolean)
		.join(" ");

	const textClass =
		color === "white" ? "timer-text-black" : "timer-text-white";

	return (
		<div className={classes}>
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
