const TimeDropdown = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-1/2 lg:w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 xs:w-20"
    >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
export default TimeDropdown;
