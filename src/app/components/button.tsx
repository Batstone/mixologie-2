
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export default function Button({label, onClick, type, className}: ButtonProps) {
    return (
        <button type={type} onClick={onClick}>{label}</button>
    );
};