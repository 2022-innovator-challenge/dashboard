import React, { useEffect } from 'react';

export function PackageInput({
  value,
  name,
  onAdd,
  onRemove,
  onChange
}: {
  value?: string;
  name?: string;
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const inputRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    if (!inputRef.current?.value) {
      inputRef.current?.focus();
    }
  });
  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        name={name}
        required
        value={value}
        onChange={e => onChange?.(e)}
      />
      <button type="button" onClick={e => onAdd?.(e)}>
        +
      </button>
      <button type="button" onClick={e => onRemove?.(e)}>
        -
      </button>
    </div>
  );
}
