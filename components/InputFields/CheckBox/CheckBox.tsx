import { ChangeEventHandler } from 'react';

const CheckBox = ({
  onChange,
  name,
  label,
  checked,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  checked: boolean;
}) => {
  return (
    <div className="flex align-middle">
      <input
        type="checkbox"
        id={`${name}Check`}
        name={`${name}Check`}
        data-testid={`${name}-check`}
        onChange={onChange}
        checked={checked}
        className="mr-2 accent-yellow-600"
      />
      <label htmlFor={`${name}Check`} className="text-white">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
