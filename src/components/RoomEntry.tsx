import React, { useState } from 'react';

interface RoomEntryProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomCode: string) => void;
}

const RoomEntry: React.FC<RoomEntryProps> = ({ onCreateRoom, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.length === 4) {
      onJoinRoom(roomCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">숫자 야구 게임</h1>
        
        <div className="space-y-6">
          <button
            onClick={onCreateRoom}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            새 게임 만들기
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 4) {
                    setRoomCode(value);
                  }
                }}
                placeholder="방 코드 입력 (4자리)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
            </div>
            <button
              type="submit"
              disabled={roomCode.length !== 4}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              방 참가하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomEntry; 