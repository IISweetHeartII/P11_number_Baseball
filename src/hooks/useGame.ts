import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';

export type GameStatus = 'playing' | 'win' | 'lose';
export type GameResult = { strike: number; ball: number };

export interface GameState {
  answer: number[];
  userInput: string;
  result: GameResult;
  attempts: number;
  gameStatus: GameStatus;
  message: string;
  gameId?: string;
}

export const useGame = (gameId?: string) => {
  const [gameState, setGameState] = useState<GameState>({
    answer: [],
    userInput: '',
    result: { strike: 0, ball: 0 },
    attempts: 0,
    gameStatus: 'playing',
    message: '1~9 사이의 서로 다른 3자리 숫자를 입력하세요.',
    gameId
  });

  // 게임 초기화 함수
  const initializeGame = useCallback(async () => {
    // 1~9 사이의 서로 다른 3자리 숫자 생성
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    const shuffled = [...numbers].sort(() => 0.5 - Math.random());
    const newAnswer = shuffled.slice(0, 3);
    
    // 새 게임 상태 설정
    const newGameState = {
      ...gameState,
      answer: newAnswer,
      userInput: '',
      result: { strike: 0, ball: 0 },
      attempts: 0,
      gameStatus: 'playing' as GameStatus,
      message: '1~9 사이의 서로 다른 3자리 숫자를 입력하세요.'
    };
    
    setGameState(newGameState);
    
    // Firebase에 새 게임 생성
    if (!gameId) {
      try {
        const gameRef = await addDoc(collection(db, 'games'), {
          answer: newAnswer,
          createdAt: serverTimestamp(),
          status: 'playing'
        });
        
        setGameState(prev => ({
          ...prev,
          gameId: gameRef.id
        }));
      } catch (error) {
        console.error('Error creating game:', error);
      }
    }
  }, [gameId, gameState]);

  // 게임 시작 시 초기화
  useEffect(() => {
    if (!gameId) {
      initializeGame();
    } else {
      // 기존 게임 참조
      const gameRef = collection(db, 'games');
      const q = query(gameRef, where('__name__', '==', gameId));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const gameData = snapshot.docs[0].data();
          setGameState(prev => ({
            ...prev,
            answer: gameData.answer || [],
            gameStatus: gameData.status || 'playing',
            message: gameData.message || '게임이 진행 중입니다.'
          }));
        }
      });
      
      return () => unsubscribe();
    }
  }, [gameId, initializeGame]);

  // 사용자 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능하도록 제한
    if (/^\d*$/.test(value) && value.length <= 3) {
      setGameState(prev => ({
        ...prev,
        userInput: value
      }));
    }
  };

  // 게임 결과 계산
  const calculateResult = (input: string): GameResult => {
    if (input.length !== 3) return { strike: 0, ball: 0 };
    
    const inputArray = input.split('').map(Number);
    let strike = 0;
    let ball = 0;
    
    // 스트라이크 계산
    for (let i = 0; i < 3; i++) {
      if (inputArray[i] === gameState.answer[i]) {
        strike++;
      }
    }
    
    // 볼 계산
    for (let i = 0; i < 3; i++) {
      if (gameState.answer.includes(inputArray[i]) && inputArray[i] !== gameState.answer[i]) {
        ball++;
      }
    }
    
    return { strike, ball };
  };

  // 게임 제출 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 입력 검증
    if (gameState.userInput.length !== 3) {
      setGameState(prev => ({
        ...prev,
        message: '3자리 숫자를 입력해주세요.'
      }));
      return;
    }
    
    // 중복 숫자 검증
    const uniqueDigits = new Set(gameState.userInput.split('')).size;
    if (uniqueDigits !== 3) {
      setGameState(prev => ({
        ...prev,
        message: '서로 다른 숫자를 입력해주세요.'
      }));
      return;
    }
    
    // 결과 계산
    const newResult = calculateResult(gameState.userInput);
    const newAttempts = gameState.attempts + 1;
    
    // 게임 상태 업데이트
    let newStatus: GameStatus = 'playing';
    let newMessage = `${newResult.strike} 스트라이크, ${newResult.ball} 볼`;
    
    if (newResult.strike === 3) {
      newStatus = 'win';
      newMessage = `축하합니다! ${newAttempts}번 만에 정답을 맞추셨습니다.`;
    } else if (newAttempts >= 10) {
      newStatus = 'lose';
      newMessage = `게임 오버! 정답은 ${gameState.answer.join('')}였습니다.`;
    }
    
    // 상태 업데이트
    setGameState(prev => ({
      ...prev,
      result: newResult,
      attempts: newAttempts,
      gameStatus: newStatus,
      message: newMessage
    }));
    
    // Firebase에 결과 저장
    if (gameState.gameId) {
      try {
        await addDoc(collection(db, 'games', gameState.gameId, 'attempts'), {
          input: gameState.userInput,
          result: newResult,
          timestamp: serverTimestamp()
        });
        
        // 게임 상태 업데이트
        if (newStatus !== 'playing') {
          // 게임 상태 업데이트 로직 (Firebase)
        }
      } catch (error) {
        console.error('Error saving attempt:', error);
      }
    }
  };

  return {
    gameState,
    handleInputChange,
    handleSubmit,
    initializeGame
  };
}; 