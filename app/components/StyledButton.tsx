export function StyledButton({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`bg-green-300 rounded-sm px-2 py-1 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
}
