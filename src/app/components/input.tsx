interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
}

export default function Input({ labelFor, labelText, id, type, onChange }: InputProps) {
  return (
    <>
      <label htmlFor={labelFor}>{labelText}</label>
      <input id={id} type={type} onChange={onChange}></input>
    </>
  );
}
