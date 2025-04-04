import React from 'react';
import { GameState } from '../hooks/useGame';

interface GameFormProps {
  gameState: GameState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GameForm: React.FC<GameFormProps> = ({ gameState, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="game-form">
      <input
        type="text"
        value={gameState.userInput}
        onChange={onInputChange}
        placeholder="3자리 숫자 입력"
        maxLength={3}
        disabled={gameState.gameStatus !== 'playing'}
      />
      <button type="submit" disabled={gameState.gameStatus !== 'playing'}>
        제출
      </button>
    </form>
  );
};

export default GameForm; 