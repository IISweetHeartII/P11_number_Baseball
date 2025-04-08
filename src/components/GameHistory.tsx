import React from 'react';

interface GameHistoryProps {
  history: Array<{ guess: string; result: string }>;
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">게임 기록</h3>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{item.guess}</span>
            <span className="text-blue-600">{item.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory; 