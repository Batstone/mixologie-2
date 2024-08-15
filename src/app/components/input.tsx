
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

export default function Input({type}: InputProps) {
    return (
        <input type={type}></input>
    );
}