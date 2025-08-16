# Chess Game in React

A modern, feature-rich chess game built with React and Vite. This project implements a complete chess game with timers, move validation, and a polished user interface.

![Chess Game Screenshot]

## Features

-   🎮 Complete chess game with standard rules
-   ⏱️ Dual player timers with pause/resume functionality
-   🔄 Move validation and legal move highlighting
-   🎯 Drag and drop piece movement
-   💾 Game state persistence (saves game progress)
-   🔔 Check, checkmate, and stalemate detection
-   🎨 Smooth animations and visual effects
-   📱 Responsive design for mobile devices

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd chess-board-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Game Controls

-   **Piece Movement**: Click or drag pieces to move them
-   **Move Indicators**: Valid moves are shown with dots on the board
-   **Timers**: Each player has their own timer that counts down during their turn
-   **Pause/Resume**: Use the pause button to halt the game and timers
-   **Restart**: Reset the game to its initial state

## Game Rules

-   Standard chess rules apply
-   Each player has a timer (default: 10 minutes)
-   Game ends on:
    -   Checkmate
    -   Stalemate
    -   Time running out
    -   Player resignation (future feature)

## Technical Details

### Architecture

The project is built using:

-   **React** for UI components
-   **Vite** for build tooling and development
-   **PropTypes** for component type checking
-   **CSS Modules** for styling

### Key Components

1. **App.jsx**: Main game container

    - Manages game state
    - Handles move validation
    - Controls game flow

2. **Dashboard.jsx**: Game information display

    - Shows current player
    - Displays game status
    - Contains timer components

3. **Timer.jsx**: Player time management

    - Individual player timers
    - Pause/resume functionality
    - Time format display

4. **useChessBoard.jsx**: Chess logic hook
    - Move validation
    - Board state management
    - Check/checkmate detection

### State Management

-   Game state persists in localStorage
-   Includes:
    -   Board position
    -   Current player
    -   Timer values
    -   Game status

## Styling

The game features a modern, clean design with:

-   Responsive layout
-   Smooth animations
-   Clear move indicators
-   Status messages
-   Mobile-friendly interface

## Future Enhancements

-   [ ] Online multiplayer support
-   [ ] AI opponent
-   [ ] Move history and notation
-   [ ] Game analysis
-   [ ] Custom time controls
-   [ ] Sound effects
-   [ ] Theme customization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Chess piece Unicode characters for the game pieces
-   React community for inspiration and best practices
-   Contributors and users who provide feedback

## Contact

For questions or feedback, please open an issue in the GitHub repository.
