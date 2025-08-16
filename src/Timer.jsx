import CountdownTimer from "./CountDownTimer.jsx";
import PropTypes from "prop-types";

// Timer now takes color and currentPlayer to style background/text
function Timer({ pause = true, color, time, setTime, onTimeout, globalPause }) {
	const isRunning = !pause && !globalPause;
	const bgClass = isRunning ? `timer-${color}` : `timer-paused`;
	const textClass = isRunning
		? color === "white"
			? "timer-text-black"
			: "timer-text-white"
		: "timer-text-paused";
	return (
		<div className={`timer-box ${bgClass}`}>
			<CountdownTimer
				isPaused={pause || globalPause}
				textClass={textClass}
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
	globalPause: PropTypes.bool,
};

export default Timer;
