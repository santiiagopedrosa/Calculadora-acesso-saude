export default function Button({ children, variant = "primary", onClick, className, ...props }) {
  return (
    <button
      className={`btn btn-${variant}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}