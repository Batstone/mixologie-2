interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  labelFor: string;
  values: string[];
}

export default function Select({ labelFor, labelText, id, values, onChange }: SelectProps) {
  return (
    <>
      <label htmlFor={labelFor}>{labelText}</label>
      <select id={id} onChange={onChange}>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
