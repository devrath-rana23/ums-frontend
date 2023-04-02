export const TextField = ({
  label = "",
  type = "text",
  value = "",
  onChange = () => { },
  addClass = "",
  required = false,
  autoComplete = "off",
  nameField = "",
  id = "",
}) => {
  return (
    <>
      {label && (
        <label htmlFor={nameField} className="not-italic font-medium text-sm leading-5 text-gray-700" >{label}</label>
      )}
      <input
        name={nameField}
        type={type}
        className={`box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full ${addClass}`}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        id={id}
      />
    </>
  );
};
