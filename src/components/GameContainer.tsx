import React from 'react';
import { useGameState } from '../hooks/useGameState';
import RoomEntry from './RoomEntry';
import GameForm from './GameForm';
import OpponentView from './OpponentView';

const GameContainer: React.FC = () => {
  const { gameState, userId, handleGuess, setMyNumber, showAnswer, resetGame, showRoomEntry, createRoom, joinRoom } = useGameState();
  
  if (showRoomEntry || !gameState) {
    return <RoomEntry onCreateRoom={createRoom} onJoinRoom={joinRoom} />;
  }

  const isPlayer1 = gameState.player1.id === userId;
  const currentPlayer = isPlayer1 ? gameState.player1 : gameState.player2;
  const opponent = isPlayer1 ? gameState.player2 : gameState.player1;

  if (!currentPlayer) return null;

  // 상대방이 아직 입장하지 않은 경우
  if (!opponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">방 번호: {gameState.roomCode}</h2>
          <p className="text-gray-600 mb-4">상대방이 입장할 때까지 기다려주세요...</p>
          <button
            onClick={() => resetGame()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            방 나가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">방 번호: {gameState.roomCode}</h2>
          <div className="text-gray-600">
            {gameState.currentPlayer === userId ? '당신의 차례입니다!' : '상대방의 차례입니다.'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">나의 게임</h2>
            {currentPlayer.number ? (
              <div className="space-y-4">
                <GameForm 
                  onSubmit={handleGuess}
                  disabled={gameState.currentPlayer !== userId}
                  placeholder="상대방의 숫자를 맞춰보세요"
                  buttonText="확인"
                />
                <div className="space-y-2">
                  {currentPlayer.history.map((attempt, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">{attempt.guess}</span>
                      <span className="text-sm text-gray-600">{attempt.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">4자리 숫자를 설정해주세요</h3>
                <p className="text-sm text-gray-600">각 자리는 서로 다른 숫자여야 합니다.</p>
                <GameForm 
                  onSubmit={setMyNumber}
                  placeholder="4자리 숫자를 입력하세요"
                  buttonText="숫자 설정"
                />
              </div>
            )}
          </div>
        </div>
        
        {gameState.isGameOver && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold mb-2">
              {gameState.winner === userId ? '축하합니다! 승리하셨습니다!' : '아쉽게도 패배하셨습니다.'}
            </p>
            {!currentPlayer.showAnswer && (
              <button
                onClick={showAnswer}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                정답 확인하기
              </button>
            )}
            {currentPlayer.showAnswer && opponent && (
              <div className="mt-2">
                <p className="text-gray-600">상대방의 정답: {opponent.number}</p>
              </div>
            )}
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
              새 게임 시작
            </button>
          </div>
        )}
      </div>

      <OpponentView gameState={gameState} userId={userId} />
    </div>
  );
};

export default GameContainer; 