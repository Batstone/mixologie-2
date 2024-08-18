interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  onClick,
  type,
  className,
}: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
