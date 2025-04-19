import React from 'react';
import { GameState } from '../hooks/useGameState';

interface OpponentHistoryProps {
  gameState: GameState;
  userId: string;
}

const OpponentHistory: React.FC<OpponentHistoryProps> = ({ gameState, userId }) => {
  const isPlayer1 = gameState.player1.id === userId;
  const opponent = isPlayer1 ? gameState.player2 : gameState.player1;
  
  if (!opponent) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">상대방의 시도</h3>
      <div className="space-y-2">
        {opponent.history.map((attempt, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="font-mono">{attempt.guess}</span>
            <span className="text-sm text-gray-600">{attempt.result}</span>
          </div>
        ))}
        {opponent.history.length === 0 && (
          <p className="text-gray-500 text-center">아직 시도한 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default OpponentHistory; 