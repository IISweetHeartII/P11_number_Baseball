import React from 'react';
import { GameState } from '../hooks/useGame';

interface GameResultProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ gameState, onRestart }) => {
  return (
    <div className="game-result">
      <p>{gameState.message}</p>
      <button onClick={onRestart}>다시 시작</button>
    </div>
  );
};

export default GameResult; 