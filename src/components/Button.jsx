export default function Button({ children, className = '', onClick, type = 'button' }) {
  return (
    <button className={`custom-button ${className}`.trim()} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
