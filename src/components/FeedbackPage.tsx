import React, { useState } from 'react';

const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      // TODO: 실제로는 서버로 피드백을 전송해야 합니다.
      console.log('피드백 제출:', feedback);
      setIsSubmitted(true);
      setFeedback('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">게임 개선하기</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">개선사항 제안</h2>
          <p className="text-gray-600 mb-6">
            게임을 더 재미있게 만들기 위한 아이디어나 버그 리포트를 보내주세요.
            여러분의 의견이 게임을 더 좋게 만듭니다!
          </p>

          {isSubmitted ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-semibold mb-4">피드백이 제출되었습니다!</p>
              <p className="text-gray-600">소중한 의견 감사합니다.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                다른 의견 보내기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="개선사항이나 버그를 자세히 설명해주세요..."
                  className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                제출하기
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage; 