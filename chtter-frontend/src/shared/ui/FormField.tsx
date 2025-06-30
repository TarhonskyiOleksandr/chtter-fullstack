interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="form-control w-full">
    {
      label ?
      <label className="label">
        <span className="label-text">{label}</span>
      </label> : null
    }
      {children}
    <label className="label h-2">
      <span className="label-text-alt text-error">{error || '\u00A0'}</span>
    </label>
  </div>
);
