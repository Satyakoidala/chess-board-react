import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./GameConfig.css";

function GameConfig({ onSubmit, onCancel }) {
	const [config, setConfig] = useState({
		player1: {
			name: "",
			color: "white",
		},
		player2: {
			name: "",
			color: "black",
		},
		timerDuration: 600, // 10 minutes in seconds
	});

	// Handle click outside and ESC key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") onCancel();
		};

		const handleClickOutside = (e) => {
			if (e.target.classList.contains("game-config-overlay")) {
				onCancel();
			}
		};

		window.addEventListener("keydown", handleEscape);
		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("keydown", handleEscape);
			window.removeEventListener("click", handleClickOutside);
		};
	}, [onCancel]);

	const handleSwitchColors = () => {
		setConfig((prev) => ({
			...prev,
			player1: {
				...prev.player1,
				color: prev.player2.color,
			},
			player2: {
				...prev.player2,
				color: prev.player1.color,
			},
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!config.player1.name.trim() || !config.player2.name.trim()) {
			alert("Please enter names for both players");
			return;
		}
		onSubmit(config);
	};

	const handleTimerChange = (minutes) => {
		setConfig((prev) => ({
			...prev,
			timerDuration: minutes * 60,
		}));
	};

	const handlePlayerChange = (player, field, value) => {
		setConfig((prev) => ({
			...prev,
			[player]: {
				...prev[player],
				[field]: value,
			},
		}));
	};

	return (
		<div className="game-config-overlay">
			<div className="game-config-modal">
				<h2>Let&apos;s Play!</h2>
				<form onSubmit={handleSubmit}>
					<div className="players-container">
						<div className="player-config">
							<h3>{config.player1.color.toLocaleUpperCase()}</h3>
							<input
								type="text"
								placeholder="Enter name"
								value={config.player1.name}
								onChange={(e) =>
									handlePlayerChange(
										"player1",
										"name",
										e.target.value
									)
								}
								autoFocus
							/>
						</div>

						<button
							type="button"
							className="switch-colors-btn"
							onClick={handleSwitchColors}
							title="Switch player colors"
							aria-label="Switch player colors"
						>
							Switch Colors
						</button>

						<div className="player-config">
							<h3>{config.player2.color.toLocaleUpperCase()}</h3>
							<input
								type="text"
								placeholder="Enter name"
								value={config.player2.name}
								onChange={(e) =>
									handlePlayerChange(
										"player2",
										"name",
										e.target.value
									)
								}
							/>
						</div>
					</div>

					<div className="timer-config">
						<h3>Timer Duration (minutes)</h3>
						<div className="timer-options">
							{[5, 10, 15, 20, 30].map((minutes) => (
								<div key={minutes} className="timer-option">
									<input
										type="radio"
										id={`timer-${minutes}`}
										name="timer"
										value={minutes}
										checked={
											config.timerDuration / 60 ===
											minutes
										}
										onChange={() =>
											handleTimerChange(minutes)
										}
									/>
									<label htmlFor={`timer-${minutes}`}>
										{minutes}
									</label>
								</div>
							))}
						</div>
					</div>

					<div className="button-group">
						<button type="submit">Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

GameConfig.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default GameConfig;
