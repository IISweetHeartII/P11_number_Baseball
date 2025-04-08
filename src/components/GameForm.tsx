import React, { useState } from 'react';

interface GameFormProps {
  onSubmit: (value: string) => void;
  disabled: boolean;
  placeholder: string;
  buttonText: string;
}

const GameForm: React.FC<GameFormProps> = ({
  onSubmit,
  disabled,
  placeholder,
  buttonText
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length === 3 && /^\d+$/.test(value) && new Set(value).size === 3) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          maxLength={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500"
        />
        {value && value.length !== 3 && (
          <p className="mt-1 text-sm text-red-500">3자리 숫자를 입력하세요</p>
        )}
        {value && value.length === 3 && new Set(value).size !== 3 && (
          <p className="mt-1 text-sm text-red-500">중복되지 않는 숫자를 입력하세요</p>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled || value.length !== 3 || new Set(value).size !== 3}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default GameForm; 