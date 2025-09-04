export function StyledInput({
  label,
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { name: string; label?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-0">
          {label}
        </label>
      )}
      <input
        className={`border-[1px] border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
        {...props}
      />
    </div>
  );
}
