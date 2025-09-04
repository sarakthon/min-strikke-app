export function StyledButton({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`rounded-full font-medium border-[1px] border-gray-300 hover:underline text-gray-800 px-4 py-2 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
}
