import React, { useState } from 'react';

interface GameFormProps {
  onSubmit: (number: string) => void;
  disabled?: boolean;
  placeholder?: string;
  buttonText?: string;
}

const GameForm: React.FC<GameFormProps> = ({
  onSubmit,
  disabled = false,
  placeholder = '4자리 숫자를 입력하세요',
  buttonText = '확인'
}) => {
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (number.length === 4 && /^\d+$/.test(number) && new Set(number).size === 4) {
      onSubmit(number);
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={number}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          if (value.length <= 4) {
            setNumber(value);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={4}
      />
      <button
        type="submit"
        disabled={disabled || number.length !== 4 || new Set(number).size !== 4}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default GameForm; 