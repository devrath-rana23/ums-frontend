export const TextField = ({
  label,
  type = "text",
  value = "",
  onChange = () => {},
  addClass = "",
  required = false,
}) => {
  return (
    <>
      {label && (
        <label className="text-sm mb-1 block leading-5 font-medium">
          {label}
        </label>
      )}
      <div className="flex relative  w-full">
        <input
          type={type}
          className={`border w-full outline-none text-left placeholder:mr-3 border-gray-300 p-3 rounded-md ${
            addClass ? addClass : "h-10"
          }`}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete="off"
        />
      </div>
    </>
  );
};
