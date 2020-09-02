import { ChangeEvent } from 'react';

type TextFieldProps = {
  id?: string;
  label: string;
  value: string;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  id = label,
  onChange,
  value,
  multiline = false,
}) => (
  <>
    <label htmlFor={id} className="text-sm text-gray-600">
      {label}
    </label>
    {multiline ? (
      <textarea
        className="w-full p-2 border rounded"
        id={id}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        className="w-full p-2 border rounded"
        id={id}
        value={value}
        onChange={onChange}
      />
    )}
  </>
);

export default TextField;
