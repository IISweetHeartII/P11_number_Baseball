import React from 'react';
import { GameState } from '../hooks/useGame';

interface GameHistoryProps {
  gameState: GameState;
}

const GameHistory: React.FC<GameHistoryProps> = ({ gameState }) => {
  return (
    <div className="game-history">
      <h2>게임 기록</h2>
      <p>정답: {gameState.gameStatus !== 'playing' ? gameState.answer.join('') : '???'}</p>
      {gameState.gameId && (
        <div className="share-info">
          <p>친구와 함께 플레이하려면 아래 링크를 공유하세요:</p>
          <input 
            type="text" 
            value={`${window.location.origin}?gameId=${gameState.gameId}`} 
            readOnly 
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}?gameId=${gameState.gameId}`);
              alert('링크가 클립보드에 복사되었습니다!');
            }}
          >
            링크 복사
          </button>
        </div>
      )}
    </div>
  );
};

export default GameHistory; 