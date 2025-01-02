type ButtonProps = {
    text: string;
    className?: string;
    onClick?: () => void; // Make onClick optional
  };
  
  const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => {
    return (
      <button
        onClick={onClick} // Will work even if onClick is undefined
        className={`px-4 py-2 rounded ${className}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  