import { HTMLInputTypeAttribute } from 'react';
import { Spinner } from './spinner';

export type FieldProps = {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  value: string;
  error?: string | boolean;
  loading?: boolean;
  disabled?: boolean;
  placeholder: string;
  onChange?: (value: string, field: string) => void;
};

export function Field({
  id,
  name,
  type = 'text',
  label,
  value,
  error,
  loading = false,
  disabled = false,
  placeholder,
  onChange = () => {},
}: FieldProps) {
  const cls =
    'h-11 transition block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200';
  return (
    <div>
      <label htmlFor={id} className="block text-left font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value, name)}
          placeholder={placeholder}
          className={`${cls} ${error ? '!text-red-600 !ring-red-500' : ''}`}
        />
        {loading ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
            <Spinner />
          </div>
        ) : null}
      </div>
    </div>
  );
}

Field.defaultProps = {
  type: 'text',
  error: false,
  loading: false,
  disabled: false,
  onChange: () => {},
};
