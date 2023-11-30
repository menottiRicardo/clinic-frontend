const ToggleSwitch = ({
  checked,
  id,
  labels,
  onChange,
}: {
  checked: boolean;
  id: string;
  labels?: { on: string; off: string };
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-center">
      <div className="form-switch">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          name={id}
          onChange={(e) => onChange?.(e.target.checked)}
          defaultChecked={checked}
        />

        <label className="bg-slate-400 dark:bg-slate-700" htmlFor={id}>
          <span className="bg-white shadow-sm" aria-hidden="true"></span>
          <span className="sr-only">Switch label</span>
        </label>
      </div>
      <div className="text-sm text-slate-400 dark:text-slate-500 italic">
        {labels ? (checked ? labels.on : labels.off) : null}
      </div>
    </div>
  );
};

export default ToggleSwitch;
