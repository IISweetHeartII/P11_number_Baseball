import React from 'react';
import { GameState } from '../hooks/useGame';

interface GameInfoProps {
  gameState: GameState;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState }) => {
  return (
    <div className="game-info">
      <p>{gameState.message}</p>
      <p>시도 횟수: {gameState.attempts}/10</p>
      {gameState.gameId && (
        <p>게임 ID: {gameState.gameId}</p>
      )}
    </div>
  );
};

export default GameInfo; 