interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Adjust onClick type
}

export default function ActionButton({ text, type, onClick }: ButtonProps) {
  return (
    <button
      className="signin_button"
      type={type}
      style={{
        margin: "10px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
