export const Select = ({
    label = "",
    onChange = () => { },
    nameField = "",
    value = "",
    options = [],
    addClass = "",
    valueKey = "",
    textKey = "",
}) => {
    return (
        <>
            {label && (
                <label htmlFor={nameField} className="not-italic font-medium text-sm leading-5 text-gray-700" >{label}</label>
            )}
            <select
                value={value}
                className={`bg-white box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[11px] rounded-md border-solid outline-none w-full ${addClass}`}
                name={nameField}
                onChange={onChange}
            >
                <option value={""}>Select an option</option>
                {options?.map((optionValue, optionIndex) => (
                    <option
                        key={optionIndex}
                        value={valueKey ? optionValue[valueKey] : ""}
                    >
                        {textKey ? optionValue[textKey] : ""}
                    </option>
                ))}
            </select>
        </>
    );
};
