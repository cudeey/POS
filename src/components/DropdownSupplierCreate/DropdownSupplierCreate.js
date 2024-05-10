import { useEffect, useState, useRef } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropdownSupplierCreate = ({ companyName, onSelect }) => {
  const dropdownRef = useRef(null);

  const handleOptionClick = (supplier) => {
    onSelect(supplier.id);
    setSelectedSupplierName(supplier.companyName);
    setIsDropdownOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSupplierName, setSelectedSupplierName] = useState("Select");

  const handleSelectClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleArrowsClick = (event) => {
    event.stopPropagation();
    handleSelectClick();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSelectClick();
    }
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="block w-40 h-12 relative rounded-lg border-0 px-2.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onClick={handleSelectClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <p className="flex justify-between cursor-pointer">
          {selectedSupplierName}
          {isDropdownOpen ? (
            <RiArrowDropDownLine
              className="h-6 w-6"
              onClick={handleArrowsClick}
            />
          ) : (
            <RiArrowDropUpLine
              className="h-6 w-6"
              onClick={handleArrowsClick}
            />
          )}
        </p>
        {isDropdownOpen && (
          <div className="absolute items-center top-14 left-0 bg-white text-black border rounded-md p-2 w-full justify-center z-10">
            {companyName.map((supplier) => (
              <div
                key={supplier.id}
                className="flex justify-center text-black hover:bg-light-orange hover:rounded-md hover:text-black hover:w-full text-center  text-xs w-full py-2 cursor-pointer"
                onClick={() => {
                  handleOptionClick(supplier);
                }}
                onKeyDown={(event) => handleKeyDown(event)}
                tabIndex={0}
                role="button"
              >
                {supplier.companyName}{" "}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSupplierCreate;
