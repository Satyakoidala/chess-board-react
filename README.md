# Chess Game in React

A modern, feature-rich chess game built with React an## Game Controls

### Basic Controls

-   **Piece Movement**:

    -   Click to select a piece, then click a valid destination or drop pieces to their destination

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

### Initial Setup

-   **Game Configuration**:
    -   Set player names and colors before starting
    -   Choose timer duration (default: 10 minutes)
    -   Configure through the game setup overlay

### Gameplay Controls

-   **Piece Movement**:
    -   Click or drag pieces to move them
    -   Visual feedback for selected pieces
    -   Automatic move validation
-   **Move Indicators**:
    -   Valid moves shown with dark dots on the board
    -   Selected piece highlighted with golden glow
    -   Last move highlighted on the board

### Game Management

-   **Timers**:
    -   Individual timers for each player
    -   Automatic pause when not player's turn
    -   Visual warning when time is low (< 30 seconds)
    -   Contrasting borders for better visibility
-   **Pause/Resume**:
    -   Halt the game and both timers
    -   Board becomes inactive during pause
    -   Resume to continue from same state
-   **Restart**:
    -   Reset the game to initial position
    -   Reset both timers to configured duration
    -   Clear saved game state

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

    - Manages game state and configuration
    - Handles move validation and execution
    - Controls overall game flow
    - Manages local storage persistence

2. **Dashboard.jsx**: Game information display

    - Shows current player and status
    - Displays game status messages
    - Contains timer components
    - Shows captured pieces

3. **GameConfig.jsx**: Game setup interface

    - Player name configuration
    - Color selection interface
    - Timer duration settings
    - Initial game setup overlay

4. **Timer.jsx**: Player time management

    - Individual player timers
    - Visual state feedback
    - Low time warnings
    - Contrasting color schemes

5. **CountdownTimer.jsx**: Timer logic

    - Countdown functionality
    - Pause/resume handling
    - Timeout detection
    - Time format display

6. **useChessBoard.jsx**: Chess logic hook
    - Move validation and rules
    - Board state management
    - Check/checkmate detection
    - Game history tracking

### State Management

The game uses a sophisticated combination of React hooks and browser storage for state management:

#### Local Storage Keys

-   `chess-board-state`: Current board position and piece locations
-   `chess-timers-v1`: Timer values and states for both players
-   `chess-game-paused`: Game pause state
-   `chess-winner-v1`: Winner information if game is complete
-   `chess-game-config`: Player names and color preferences
-   `chess-move-history`: Record of previous moves (future feature)

#### React State Management

1. **Custom Hooks**

    - `useChessBoard`: Chess logic and board state management
    - Handles move validation, piece positions, and game rules
    - Manages check and checkmate detection

2. **React Hooks**

    - `useState`: UI state, timers, and game configuration
    - `useEffect`: Side effects and storage synchronization
    - `useRef`: DOM references and interval management
    - `useReducer`: Complex state transitions in chess logic

3. **Component State**
    - Piece positions and valid moves
    - Timer states and countdown logic
    - Player information and preferences
    - Game configuration and settings

#### Persistence Features

-   **Automatic Saving**:

    -   Board state after each move
    -   Timer values in real-time
    -   Player configuration and preferences
    -   Game state for pause/resume

-   **State Recovery**:
    -   Game resumes from last position on refresh
    -   Timer values preserved accurately
    -   Player settings maintained
    -   Manual reset option available

## Styling

The game features a modern, clean design with:

-   Responsive layout
-   Smooth animations
-   Clear move indicators
-   Status messages
-   Mobile-friendly interface

## Future Enhancements

### Planned Features

-   [ ] Online multiplayer support with real-time game sync
-   [ ] AI opponent with multiple difficulty levels
-   [ ] Move history with algebraic notation
-   [ ] Game analysis and move suggestions
-   [ ] Piece capture animations and visual effects
-   [ ] Sound effects for moves, captures, and events

### User Experience

-   [ ] Custom time controls with increment options
-   [ ] Theme customization with multiple board styles
-   [ ] Mobile-optimized touch interactions
-   [ ] Accessibility improvements for screen readers

### Technical Improvements

-   [ ] WebSocket integration for multiplayer
-   [ ] Optimized move validation algorithms
-   [ ] Local engine integration for analysis
-   [ ] Progressive Web App (PWA) support
-   [ ] Improved state management with Redux/Zustand

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

Made with ❤️ by Satya Koidala
