import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleArrowsClick = (event) => {
    event.stopPropagation();
    toggleDropdown();
  };

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="block lg:w-80 lg:h-44 relative rounded-lg border-0 px-2.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 xs:w-[180px]">
        <p
          className="flex justify-between cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption : "Select"}
          {isOpen ? (
            <RiArrowDropUpLine
              className="h-6 w-6 arrow-icon"
              onClick={handleArrowsClick}
            />
          ) : (
            <RiArrowDropDownLine
              className="h-6 w-6 arrow-icon"
              onClick={handleArrowsClick}
            />
          )}
        </p>
        {isOpen && (
          <div className="absolute items-center top-14 left-0 bg-white border rounded-md p-2 w-full justify-center z-10">
            {options.map((option) => (
              <div
                key={option.id}
                value={option.table_number}
                className={`flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer`}
                onClick={() => {
                  handleOptionClick(option.table_number);
                }}
              >
                {option.table_number}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
