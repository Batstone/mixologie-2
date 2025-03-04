interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, onClick, type, className, ...props }: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
