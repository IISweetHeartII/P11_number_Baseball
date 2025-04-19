import React from 'react';
import { GameState } from '../hooks/useGameState';

interface OpponentViewProps {
  gameState: GameState;
  userId: string;
}

const OpponentView: React.FC<OpponentViewProps> = ({ gameState, userId }) => {
  const isPlayer1 = gameState.player1.id === userId;
  const opponent = isPlayer1 ? gameState.player2 : gameState.player1;
  const myNumber = isPlayer1 ? gameState.player1.number : gameState.player2?.number;

  if (!opponent) return null;

  return (
    <div className="fixed right-4 top-4 w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">내가 정한 숫자</h3>
        <p className="text-2xl font-mono mt-2">{myNumber || '숫자 설정 중...'}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">상대방의 시도</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
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
    </div>
  );
};

export default OpponentView; 