import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const TableDropdown = ({
  options,
  selectedOption,
  isOpen,
  onSelect,
  toggleDropdown,
}) => {
  const handleOptionClick = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <div className="relative">
      <div className="block relative w-full h-46 rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <p
          className="flex justify-between cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption || "Select"}
          {isOpen ? (
            <RiArrowDropUpLine className="h-6 w-6" />
          ) : (
            <RiArrowDropDownLine className="h-6 w-6" />
          )}
        </p>
        {isOpen && (
          <div className="absolute items-center top-14 left-0 bg-white border rounded-md p-2 w-full justify-center z-10">
            {options.map((option) => (
              <div
                key={option}
                value={option}
                className={`flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer`}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDropdown;
