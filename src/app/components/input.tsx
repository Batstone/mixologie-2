interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelFor: string;
  className?: string;
}

export default function Input({ labelFor, labelText, id, type, onChange, className, placeholder }: InputProps) {
  return (
    <>
      <label htmlFor={labelFor}>{labelText}</label>
      <input id={id} type={type} onChange={onChange} className={`${className}`} placeholder={placeholder}></input>
    </>
  );
}
