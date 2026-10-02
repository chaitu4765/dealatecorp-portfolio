export function SkyToggle({ checked, onChange }) {
  return (
    <label className="sky-toggle" aria-label="Toggle dark theme">
      <input
        type="checkbox"
        role="switch"
        aria-label={checked ? "Switch to light theme" : "Switch to dark theme"}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="sky-toggle__track" aria-hidden="true">
        <span className="sky-toggle__stars">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="sky-toggle__clouds" />
        <span className="sky-toggle__orb">
          <span className="sky-toggle__moon">
            <i />
            <i />
            <i />
          </span>
        </span>
      </span>
    </label>
  );
}
