import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">숫자야구 게임</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">게임 규칙</h2>
          <div className="space-y-4 text-gray-700">
            <p>1. 각 플레이어는 4자리 숫자를 정합니다.</p>
            <p>2. 각 자리의 숫자는 서로 달라야 합니다.</p>
            <p>3. 번갈아가며 상대방의 숫자를 맞춥니다.</p>
            <p>4. 숫자와 위치가 모두 맞으면 스트라이크(S), 숫자만 맞으면 볼(B)입니다.</p>
            <p>5. 먼저 상대방의 숫자를 맞추는 사람이 승리합니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">게임 진행 방식</h2>
          <div className="space-y-4 text-gray-700">
            <p>1. "게임하기" 버튼을 클릭하여 게임을 시작합니다.</p>
            <p>2. 새 게임을 만들거나 기존 방에 참가할 수 있습니다.</p>
            <p>3. 상대방이 입장할 때까지 기다립니다.</p>
            <p>4. 번갈아가며 숫자를 설정하고 게임을 진행합니다.</p>
            <p>5. 게임이 끝나면 정답을 확인하고 새 게임을 시작할 수 있습니다.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/game"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            게임하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 