import moment from "moment";

export const DatePicker = ({
  label = "",
  value = "",
  onChange = () => { },
  addClass = "",
  required = false,
  autoComplete = "off",
  nameField = "",
  id = "",
}) => {

  const maxDate = () => {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10) { month = '0' + month.toString(); }
    if (day < 10) { day = '0' + day.toString(); }
    let maxDate = year + '-' + month + '-' + day;
    return maxDate;
  }

  return (
    <>
      {label && <label className="not-italic font-medium text-sm leading-5 text-gray-700">{label}</label>}
      <input
        name={nameField}
        type={`date`}
        className={`box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full ${addClass}`}
        value={moment(value).format("YYYY-MM-DD")}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        id={id}
        max={maxDate()}
      />
    </>
  );
};
