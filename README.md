# Chess Game in React

A modern, feature-rich chess game built with React an## Game Controls

### Basic Controls

-   **Piece Movement**:
    -   Click to select a piece, then click a valid destination

## Contributing

Contributions are welcome! Here's how you can help:

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

-   Follow the existing code style
-   Add comments for complex logic
-   Update documentation for significant changes
-   Add tests for new features

### Bug Reports

-   Use the GitHub issue tracker
-   Include detailed steps to reproduce
-   Attach screenshots if relevant
-   Mention your browser and OS

## Performance

The application is optimized for performance:

-   Efficient move validation algorithms
-   Minimal re-renders using React.memo
-   Optimized piece movement animations
-   Local storage for game state persistence
-   Responsive design for all screen sizes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   Chess piece Unicode characters from the Unicode Standard
-   React community for component patterns and hooks
-   Vite team for the amazing build tool
-   All contributors and users who provide feedback

## Contact

-   Repository: [github.com/Satyakoidala/chess-board-react](https://github.com/Satyakoidala/chess-board-react)
-   Issue Tracker: [GitHub Issues](https://github.com/Satyakoidala/chess-board-react/issues)
-   Follow [@Satyakoidala](https://twitter.com/Satyakoidala) for updates

---

Made with ❤️ by Satya Koidalarop pieces to their destination

-   **Move Indicators**:
    -   Dark dots show valid move locations
    -   Selected piece is highlighted with a golden glow
-   **Game Flow**:
    -   Alternating turns between white and black
    -   Valid moves are enforced by the game rules

### Special Controls

-   **Timers**:
    -   Each player has a 10-minute timer
    -   Timer counts down during player's turn
    -   Timer pauses when it's opponent's turn
-   **Pause/Resume**:
    -   Use the pause button to halt the game
    -   Both timers stop when game is paused
    -   Board becomes inactive during pause
-   **Restart**:
    -   Reset the game to initial position
    -   Resets both timers to 10 minutes
    -   Clears any saved game state This project implements a complete chess game with timers, move validation, and a polished user interface.

## Demo

[Live Demo](https://react-chess-board-game.netlify.app)

![Game screenshot](/public/image.png)

## Overview

This chess implementation features a sleek, modern interface with a focus on user experience. Players can enjoy a full chess game with real-time move validation, piece highlighting, and timer functionality. The game supports both click-to-move and drag-and-drop interactions, making it intuitive for players of all skill levels.

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
-   npm (v7 or higher) or yarn (v1.22 or higher)
-   Modern web browser with ES6+ support

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Satyakoidala/chess-board-react
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

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

### Available Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build locally
-   `npm run lint` - Run ESLint for code quality
-   `npm run format` - Format code with Prettier

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

The game uses a combination of React hooks and localStorage for state management:

#### Local Storage Keys

-   `chess-board-state`: Current board position and piece locations
-   `chess-timers-v1`: Timer values for both players
-   `chess-game-paused`: Game pause state
-   `chess-winner-v1`: Winner information if game is complete

#### React State Hooks

-   `useChessBoard`: Custom hook for chess logic and board state
-   `useState`: For UI state management
-   `useEffect`: For side effects and localStorage synchronization

#### Persistence Features

-   Game state automatically saves after each move
-   Timers persist between page refreshes
-   Game can be resumed from last saved position
-   Manual reset available via Restart button

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
