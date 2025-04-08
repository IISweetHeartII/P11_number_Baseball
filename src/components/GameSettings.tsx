import React, { useState } from 'react';

interface GameSettingsProps {
  onStartGame: (settings: { digitCount: number; isRandom: boolean }) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onStartGame }) => {
  const [digitCount, setDigitCount] = useState<number>(3);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">게임 설정</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">숫자 개수 선택</label>
        <div className="flex gap-2">
          {[3, 4, 5].map((count) => (
            <button
              key={count}
              onClick={() => setDigitCount(count)}
              className={`px-4 py-2 rounded ${
                digitCount === count
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {count}자리
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onStartGame({ digitCount, isRandom: true })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          랜덤으로 생성하기
        </button>
        <button
          onClick={() => onStartGame({ digitCount, isRandom: false })}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          직접 숫자 정하기
        </button>
      </div>
    </div>
  );
};

export default GameSettings; 