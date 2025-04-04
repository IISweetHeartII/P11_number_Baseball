import React, { useEffect, useState } from 'react';
import { useGame, GameState } from '../hooks/useGame';
import GameForm from './GameForm';
import GameInfo from './GameInfo';
import GameResult from './GameResult';
import GameHistory from './GameHistory';

const GameContainer: React.FC = () => {
  // URL에서 게임 ID와 플레이어 이름 가져오기
  const [gameId, setGameId] = useState<string | undefined>(undefined);
  const [playerName, setPlayerName] = useState<string | undefined>(undefined);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);

  useEffect(() => {
    // URL 파라미터 파싱
    const params = new URLSearchParams(window.location.search);
    const gameIdParam = params.get('gameId');
    const playerNameParam = params.get('playerName');
    
    if (gameIdParam) {
      setGameId(gameIdParam);
    }
    
    if (playerNameParam) {
      setPlayerName(playerNameParam);
    } else {
      setShowNameInput(true);
    }
  }, []);

  // 게임 훅 사용
  const { gameState, handleInputChange, handleSubmit, initializeGame } = useGame(gameId, playerName);

  // 플레이어 이름 설정
  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('playerName') as string;
    
    if (name.trim()) {
      setPlayerName(name);
      setShowNameInput(false);
      
      // URL에 플레이어 이름 추가
      const url = new URL(window.location.href);
      url.searchParams.set('playerName', name);
      window.history.pushState({}, '', url.toString());
    }
  };

  // 게임 ID 공유 링크 생성
  const createShareLink = () => {
    if (gameState.gameId) {
      const url = new URL(window.location.origin);
      url.searchParams.set('gameId', gameState.gameId);
      if (playerName) {
        url.searchParams.set('playerName', playerName);
      }
      return url.toString();
    }
    return '';
  };

  return (
    <div className="baseball-game">
      <h1>숫자야구게임</h1>
      
      {showNameInput ? (
        <div className="name-input-container">
          <h2>플레이어 이름을 입력하세요</h2>
          <form onSubmit={handleNameSubmit} className="name-form">
            <input
              type="text"
              name="playerName"
              placeholder="이름 입력"
              required
            />
            <button type="submit">시작</button>
          </form>
        </div>
      ) : (
        <>
          <GameInfo gameState={gameState} />
          
          {gameState.gameStatus === 'playing' ? (
            <GameForm
              gameState={gameState}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <GameResult
              gameState={gameState}
              onRestart={initializeGame}
            />
          )}
          
          <GameHistory gameState={gameState} />
        </>
      )}
    </div>
  );
};

export default GameContainer; 