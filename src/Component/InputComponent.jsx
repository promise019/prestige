export default function InputComponent({ className, onChange, type, value, name, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      name={name}
      placeholder={placeholder}
    />
  );
}
