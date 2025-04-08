import React from 'react';
import { useGameState } from '../hooks/useGameState';
import RoomEntry from './RoomEntry';
import GameForm from './GameForm';

const GameContainer: React.FC = () => {
  const {
    userId,
    gameState,
    showRoomEntry,
    setShowRoomEntry,
    createRoom,
    joinRoom,
    setMyNumber,
    handleGuess,
    getGameStatus,
    showAnswer,
    resetGame
  } = useGameState();

  if (showRoomEntry || !gameState) {
    return <RoomEntry onCreateRoom={createRoom} onJoinRoom={joinRoom} />;
  }

  const amIPlayer1 = gameState.player1.id === userId;
  const myHistory = amIPlayer1 ? gameState.player1.history : gameState.player2?.history || [];
  const isMyTurn = gameState.currentPlayer === userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          {/* 헤더 영역 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {amIPlayer1 ? "Player 1" : "Player 2"}
            </h2>
            <button
              onClick={() => {
                resetGame();
                setShowRoomEntry(true);
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* 게임 상태 메시지 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-center text-gray-700 font-medium">
              {getGameStatus()}
            </p>
          </div>

          {/* 게임 폼 */}
          {gameState.gameStatus === 'setting_numbers' && (
            <div className="mb-6">
              <GameForm
                type="number"
                onSubmit={setMyNumber}
                disabled={
                  (amIPlayer1 && gameState.player1.number) ||
                  (!amIPlayer1 && gameState.player2?.number)
                }
                placeholder="숫자를 입력하세요"
                buttonText="숫자 설정"
              />
            </div>
          )}

          {gameState.gameStatus === 'playing' && (
            <div className="mb-6">
              <GameForm
                type="guess"
                onSubmit={handleGuess}
                disabled={!isMyTurn}
                placeholder="상대방 숫자를 맞춰보세요"
                buttonText="확인"
              />
            </div>
          )}

          {/* 게임 히스토리 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">나의 기록</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {myHistory.length > 0 ? (
                <div className="space-y-2">
                  {myHistory.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                      <span className="font-medium text-gray-700">{entry.guess}</span>
                      <span className="text-sm text-gray-500">{entry.result}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">아직 기록이 없습니다</p>
              )}
            </div>
          </div>

          {/* 게임 종료 */}
          {gameState.isGameOver && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">게임 종료!</h3>
              {!gameState.showAnswer ? (
                <button
                  onClick={showAnswer}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors mb-4"
                >
                  정답 확인하기
                </button>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-lg text-gray-700">
                    상대방의 정답: {amIPlayer1 ? gameState.player2?.number : gameState.player1.number}
                  </p>
                </div>
              )}
              <button
                onClick={() => setShowRoomEntry(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                새 게임 시작
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameContainer; 