import React, { useState } from 'react';

interface RoomEntryProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomCode: string) => void;
}

const RoomEntry: React.FC<RoomEntryProps> = ({ onCreateRoom, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState<string>('');

  const handleJoinRoom = () => {
    if (roomCode.length === 4 && /^\d{4}$/.test(roomCode)) {
      onJoinRoom(roomCode);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">방 입장</h2>
      
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <input
          type="text"
          maxLength={4}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.replace(/\D/g, ''))}
          placeholder="4자리 방 코드 입력"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleJoinRoom}
          disabled={roomCode.length !== 4}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          방 참가하기
        </button>
      </div>

      <div className="w-full max-w-xs">
        <button
          onClick={onCreateRoom}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          새 방 만들기
        </button>
      </div>
    </div>
  );
};

export default RoomEntry; 