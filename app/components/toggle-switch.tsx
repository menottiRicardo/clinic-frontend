import { useSubmit } from '@remix-run/react';

const ToggleSwitch = ({
  checked,
  id,
  labels,
}: {
  checked: boolean;
  id: string;
  labels?: { on: string; off: string };
}) => {
  const submit = useSubmit();
  return (
    <div className="flex items-center">
      <div className="form-switch">
        <input
          type="checkbox"
          id="switch-1"
          className="sr-only"
          name="id"
          checked={checked}
          onChange={(e) => {
            submit(
              { checked: e.target.checked, _action: 'visibility', id },
              { method: 'post' }
            );
          }}
        />

        <label className="bg-slate-400 dark:bg-slate-700" htmlFor="switch-1">
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
