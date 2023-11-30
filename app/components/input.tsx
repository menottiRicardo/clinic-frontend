import React from 'react';

const TextInput = ({
  id,
  label,
  name,
  defaultValue,
}: {
  label?: string;
  id: string;
  name: string;
  defaultValue: string;
}) => {
  return (
    <>
      {label && (
        <label className="block text-sm font-medium mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className="form-input w-full"
        name={name}
        type="text"
        defaultValue={defaultValue}
      />
    </>
  );
};

export default TextInput;
