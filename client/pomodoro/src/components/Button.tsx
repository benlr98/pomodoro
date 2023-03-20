

interface ButtonProps {
  children: string,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  size?: "sm" | "md" | "lg";
  placeleft?: string,
}
export default function Button({ type = "button", onClick, children, ...rest }: ButtonProps) {


  let defaultStyle = `
    ${rest.placeleft ? "mr-auto" : "mx-1"}
    ${rest.size ? "p-1" : "p-3"} 
    border
  `;

  return (
    <button className={defaultStyle} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}