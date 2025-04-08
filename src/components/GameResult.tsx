import React from 'react';

interface GameResultProps {
  attempts: number;
  isGameOver: boolean;
  targetNumber: string;
}

const GameResult: React.FC<GameResultProps> = ({ attempts, isGameOver, targetNumber }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">게임 결과</h3>
      <p>시도 횟수: {attempts}회</p>
      {isGameOver && (
        <p className="mt-2 text-green-600 font-medium">
          정답: {targetNumber}
        </p>
      )}
    </div>
  );
};

export default GameResult; 