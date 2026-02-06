import React from 'react';
import { COLORS } from '../constants';

interface ChessGamePreviewProps {
  code?: string;
  isGenerating?: boolean;
}

const ChessGamePreview: React.FC<ChessGamePreviewProps> = ({ code, isGenerating }) => {
  // Simple chess board state for preview
  const [board, setBoard] = React.useState<string[][]>([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);

  const getPieceSymbol = (piece: string) => {
    const symbols: { [key: string]: string } = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };
    return symbols[piece] || '';
  };

  const getPieceColor = (piece: string) => {
    return piece === piece.toUpperCase() ? 'text-white' : 'text-black';
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-bounce">♟</div>
          <div className="text-white font-mono text-sm">Generating chess game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 to-black p-2 sm:p-4 overflow-y-auto">
      {/* Chess Board - RESPONSIVE */}
      <div className="max-w-full mx-auto">
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-black text-white mb-1">Chess Game</h2>
          <p className="text-[10px] sm:text-xs text-white/60 font-mono">Interactive Preview</p>
        </div>
        
        <div className="bg-white/10 border-2 border-white/20 rounded-lg p-1 sm:p-2">
          {/* Board - RESPONSIVE GRID */}
          <div className="grid grid-cols-8 gap-0 max-w-full mx-auto">
            {board.map((row, rowIdx) =>
              row.map((piece, colIdx) => {
                const isLight = (rowIdx + colIdx) % 2 === 0;
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`
                      aspect-square flex items-center justify-center
                      ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                      border border-amber-300/20
                      cursor-pointer hover:bg-amber-200/50 active:bg-amber-300/70 transition-colors
                      min-w-0
                    `}
                  >
                    {piece && (
                      <span className={`text-lg sm:text-xl md:text-2xl ${getPieceColor(piece)} select-none`}>
                        {getPieceSymbol(piece)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Game Info - RESPONSIVE */}
        <div className="mt-3 sm:mt-4 space-y-2">
          <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono text-white/60">Turn:</span>
            <span className="text-xs sm:text-sm font-bold text-white">White</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono text-white/60">Status:</span>
            <span className="text-xs sm:text-sm font-bold text-green-400">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGamePreview;
