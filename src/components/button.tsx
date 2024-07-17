import { MouseEventHandler } from 'react';
import { Spinner } from './spinner';

export type ButtonProps = {
  text: string;
  type?: 'normal' | 'primary';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  text,
  type = 'normal',
  loading = false,
  disabled = false,
  className = '',
  onClick = () => {},
}: ButtonProps) {
  if (type === 'primary') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${className} flex items-center justify-center transition rounded-md bg-cyan-500 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-500`}>
        {loading ? <Spinner className="text-white mr-2" /> : null} {text}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${className} transition rounded-md bg-white py-2.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}>
      {text}
    </button>
  );
}
