export function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="label">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
export function Input({ label, required, error, ...props }) {
  return (
    <Field label={label} required={required} error={error}>
      <input className="input" {...props} />
    </Field>
  );
}
export function Select({ label, required, error, children, ...props }) {
  return (
    <Field label={label} required={required} error={error}>
      <select className="input" {...props}>
        {children}
      </select>
    </Field>
  );
}
export function Textarea({ label, required, error, ...props }) {
  return (
    <Field label={label} required={required} error={error}>
      <textarea className="input min-h-24 resize-y" {...props} />
    </Field>
  );
}
