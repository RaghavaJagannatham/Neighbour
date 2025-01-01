// components/Button.tsx

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  }
  
  const Button = ({ text, onClick, className }: ButtonProps) => {
    return (
      <button onClick={onClick} className={`py-3 px-6 rounded-lg ${className}`}>
        {text}
      </button>
    );
  };
  
  export default Button;
  