export const TextField = ({
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
                defaultValue={value}
                className={`${addClass}`}
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
