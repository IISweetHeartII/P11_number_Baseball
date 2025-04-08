import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

export interface GameState {
  roomCode: string;
  digitCount: number;
  player1: {
    id: string;
    number: string;
    history: Array<{
      guess: string;
      result: string;
    }>;
  };
  player2: {
    id: string;
    number: string;
    history: Array<{
      guess: string;
      result: string;
    }>;
  } | null;
  currentPlayer: string;
  gameStatus: 'waiting' | 'setting_numbers' | 'playing' | 'finished';
  attempts: number;
  isGameOver: boolean;
  showAnswer: boolean;
}

export interface GameSettings {
  digitCount: number;
  isRandom: boolean;
}

export const useGameState = () => {
  const [userId, setUserId] = useState<string>('');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  const [showRoomEntry, setShowRoomEntry] = useState(false);

  useEffect(() => {
    // 사용자 ID 생성 (실제로는 인증 시스템을 사용해야 함)
    setUserId(Math.random().toString(36).substr(2, 9));
  }, []);

  const validateNumber = (number: string, digitCount: number): boolean => {
    if (number.length !== digitCount) return false;
    const digits = new Set(number.split(''));
    return digits.size === digitCount && /^\d+$/.test(number);
  };

  const createRoom = async () => {
    const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newGameState: GameState = {
      roomCode,
      digitCount: 3,
      player1: {
        id: userId,
        number: '',
        history: []
      },
      player2: null,
      currentPlayer: userId,
      gameStatus: 'waiting',
      attempts: 0,
      isGameOver: false,
      showAnswer: false
    };

    await setDoc(doc(db, 'games', roomCode), newGameState);
    setGameState(newGameState);
    setShowRoomEntry(false);
  };

  const joinRoom = async (roomCode: string) => {
    const gameRef = doc(db, 'games', roomCode);
    const gameDoc = await getDoc(gameRef);

    if (gameDoc.exists()) {
      const gameData = gameDoc.data() as GameState;
      if (gameData.player2) {
        alert('방이 가득 찼습니다.');
        return;
      }

      const updatedState = {
        ...gameData,
        player2: {
          id: userId,
          number: '',
          history: []
        },
        gameStatus: 'setting_numbers'
      };

      await updateDoc(gameRef, updatedState);
      setGameState(updatedState as GameState);
      setShowRoomEntry(false);
    } else {
      alert('존재하지 않는 방입니다.');
    }
  };

  const setMyNumber = async (number: string) => {
    if (!gameState || !validateNumber(number, gameState.digitCount)) return;

    const gameRef = doc(db, 'games', gameState.roomCode);
    const isPlayer1 = gameState.player1.id === userId;
    
    const update = isPlayer1
      ? { 'player1.number': number }
      : { 'player2.number': number };

    await updateDoc(gameRef, update);

    // 두 플레이어 모두 숫자를 정했는지 확인
    const currentDoc = await getDoc(gameRef);
    const currentData = currentDoc.data() as GameState;
    
    if (currentData.player1?.number && currentData.player2?.number) {
      await updateDoc(gameRef, { gameStatus: 'playing' });
    }

    setGameState(prev => {
      if (!prev) return null;
      if (isPlayer1) {
        return { ...prev, player1: { ...prev.player1, number } };
      } else if (prev.player2) {
        return { ...prev, player2: { ...prev.player2, number } };
      }
      return prev;
    });
  };

  const startGame = async (settings: GameSettings) => {
    if (!gameState) return;

    const targetNumber = settings.isRandom
      ? generateRandomNumber(settings.digitCount)
      : '';

    const gameRef = doc(db, 'games', gameState.roomCode);
    await updateDoc(gameRef, {
      digitCount: settings.digitCount,
      targetNumber,
      isGameOver: false,
      attempts: 0,
      'player1.history': [],
      'player2.history': []
    });

    setGameState(prev => prev ? {
      ...prev,
      digitCount: settings.digitCount,
      targetNumber,
      isGameOver: false,
      attempts: 0,
      'player1.history': [],
      'player2.history': []
    } : null);
    setShowSettings(false);
  };

  const handleGuess = async (guess: string) => {
    if (!gameState || gameState.isGameOver || !validateNumber(guess, gameState.digitCount)) return;

    const isPlayer1 = gameState.player1.id === userId;
    const targetNumber = isPlayer1 ? gameState.player2?.number : gameState.player1.number;

    if (!targetNumber) return;

    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetNumber[i]) {
        strikes++;
      } else if (targetNumber.includes(guess[i])) {
        balls++;
      }
    }

    const result = `${strikes}S ${balls}B`;
    const newHistory = {
      guess,
      result
    };

    const isGameOver = strikes === gameState.digitCount;

    const gameRef = doc(db, 'games', gameState.roomCode);
    await updateDoc(gameRef, {
      ...(isPlayer1 
        ? { 'player1.history': [...(gameState.player1.history || []), newHistory] }
        : { 'player2.history': [...(gameState.player2?.history || []), newHistory] }
      ),
      currentPlayer: isGameOver ? gameState.currentPlayer : (gameState.currentPlayer === gameState.player1.id ? gameState.player2?.id : gameState.player1.id),
      isGameOver: isGameOver,
      gameStatus: isGameOver ? 'finished' : 'playing',
      showAnswer: false
    });
  };

  const showAnswer = async () => {
    if (!gameState || !gameState.isGameOver) return;
    
    const gameRef = doc(db, 'games', gameState.roomCode);
    await updateDoc(gameRef, {
      showAnswer: true
    });
  };

  const resetGame = async () => {
    if (!gameState) return;
    
    const gameRef = doc(db, 'games', gameState.roomCode);
    await updateDoc(gameRef, {
      gameStatus: 'waiting',
      'player1.number': '',
      'player1.history': [],
      'player2.number': '',
      'player2.history': [],
      currentPlayer: gameState.player1.id,
      isGameOver: false,
      showAnswer: false,
      attempts: 0
    });
  };

  useEffect(() => {
    if (!gameState?.roomCode) return;

    const gameRef = doc(db, 'games', gameState.roomCode);
    const unsubscribe = onSnapshot(gameRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as GameState;
        setGameState(data);
      }
    });

    return () => unsubscribe();
  }, [gameState?.roomCode]);

  const getGameStatus = (): string => {
    if (!gameState) return '';
    
    switch (gameState.gameStatus) {
      case 'waiting':
        return '상대방을 기다리는 중...';
      case 'setting_numbers':
        if ((gameState.player1.id === userId && !gameState.player1.number) ||
            (gameState.player2?.id === userId && !gameState.player2.number)) {
          return '자신의 숫자를 정해주세요.';
        }
        return '상대방이 숫자를 정하는 중...';
      case 'playing':
        return gameState.currentPlayer === userId
          ? '상대방의 숫자를 맞춰보세요!'
          : '상대방의 차례입니다.';
      case 'finished':
        return '게임이 종료되었습니다!';
      default:
        return '';
    }
  };

  return {
    userId,
    gameState,
    showSettings,
    showRoomEntry,
    setShowRoomEntry,
    createRoom,
    joinRoom,
    setMyNumber,
    handleGuess,
    getGameStatus,
    showAnswer,
    resetGame
  };
}; 