import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// textClass controls the color of the time text
// Now controlled by parent: time, setTime, onTimeout
function CountdownTimer({
	isPaused = false,
	textClass = "",
	time,
	setTime,
	onTimeout,
}) {
	const intervalRef = useRef(null);

	useEffect(() => {
		const startTimer = () => {
			if (intervalRef.current) return;
			if (time > 0) {
				intervalRef.current = setInterval(() => {
					setTime((prev) => {
						if (prev <= 1) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
							if (onTimeout) onTimeout();
							return 0;
						}
						return prev - 1;
					});
				}, 1000);
			}
		};
		const pauseTimer = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
		if (!isPaused && time > 0) {
			startTimer();
		} else {
			pauseTimer();
		}
		return () => pauseTimer();
	}, [isPaused, time, setTime, onTimeout]);

	// (No duplicate timer functions; all logic is in the main useEffect above)

	const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

	return <span className={textClass}>{formattedTime}</span>;
}

CountdownTimer.propTypes = {
	isPaused: PropTypes.bool,
	textClass: PropTypes.string,
	time: PropTypes.number.isRequired,
	setTime: PropTypes.func.isRequired,
	onTimeout: PropTypes.func,
};

export default CountdownTimer;
