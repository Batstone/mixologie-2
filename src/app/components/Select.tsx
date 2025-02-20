interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  labelFor: string;
  values: string[];
  className?: string;
}

export default function Select({ labelFor, labelText, id, values, onChange, className }: SelectProps) {
  return (
    <>
      <label htmlFor={labelFor}>{labelText}</label>
      <select id={id} onChange={onChange} className={`${className}`}>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
