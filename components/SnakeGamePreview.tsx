import React, { useState, useEffect, useCallback } from 'react';

interface SnakeGamePreviewProps {
  code?: string;
  isGenerating?: boolean;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };

const SnakeGamePreview: React.FC<SnakeGamePreviewProps> = ({ code, isGenerating }) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  // Check collision
  const checkCollision = (head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused || isGenerating) return;

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move head based on direction
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check collision
        if (checkCollision(head, prevSnake)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if food eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood());
          return newSnake;
        }

        // Remove tail
        newSnake.pop();
        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameInterval);
  }, [direction, food, gameStarted, gameOver, isPaused, isGenerating, generateFood]);

  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPaused) {
        if (e.key === ' ') {
          setIsPaused(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver, isPaused]);

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setIsPaused(false);
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">🐍</div>
          <div className="text-white font-mono text-sm">Generating snake game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-4 sm:p-6 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">🐍 Snake Game</h2>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1">
            <span className="text-blue-400 font-mono font-bold">Score: {score}</span>
          </div>
          {gameOver && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-1">
              <span className="text-red-400 font-mono">Game Over!</span>
            </div>
          )}
          {isPaused && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-1">
              <span className="text-yellow-400 font-mono">Paused</span>
            </div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Game Grid */}
          <div 
            className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-2 border-green-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gap: '2px',
            }}
          >
            {/* Grid Cells */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
              const isSnakeBody = snake.slice(1).some(seg => seg.x === x && seg.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`
                    ${isSnakeHead 
                      ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg scale-110 z-10' 
                      : isSnakeBody 
                      ? 'bg-gradient-to-br from-green-500/80 to-green-600/80' 
                      : isFood
                      ? 'bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse shadow-lg scale-125 z-10'
                      : 'bg-white/5 hover:bg-white/10'
                    }
                    transition-all duration-100
                    ${isSnakeHead ? 'border-2 border-green-300' : ''}
                  `}
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                />
              );
            })}
          </div>

          {/* Overlay Messages */}
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">🐍</div>
                <h3 className="text-2xl font-black text-white mb-2">Snake Game</h3>
                <p className="text-white/60 text-sm mb-4">Use arrow keys to play</p>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl">
              <div className="text-center space-y-4">
                <div className="text-5xl mb-4">💀</div>
                <h3 className="text-2xl font-black text-white mb-2">Game Over!</h3>
                <p className="text-white/60 text-lg mb-2">Final Score: <span className="text-green-400 font-bold">{score}</span></p>
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {isPaused && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">⏸️</div>
                <p className="text-white font-bold text-lg">Paused</p>
                <p className="text-white/60 text-sm mt-2">Press Space to resume</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 sm:mt-6 space-y-3">
        {/* Directional Controls */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
            disabled={!gameStarted || gameOver || isPaused}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <span className="text-2xl">⬆️</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
              disabled={!gameStarted || gameOver || isPaused}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <span className="text-2xl">⬅️</span>
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              disabled={!gameStarted || gameOver}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <span className="text-xl">{isPaused ? '▶️' : '⏸️'}</span>
            </button>
            <button
              onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
              disabled={!gameStarted || gameOver || isPaused}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <span className="text-2xl">➡️</span>
            </button>
          </div>
          <button
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
            disabled={!gameStarted || gameOver || isPaused}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <span className="text-2xl">⬇️</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-white/40 text-xs font-mono">
            {!gameStarted ? 'Click Start Game to begin' : 'Use arrow keys or buttons to control'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGamePreview;
