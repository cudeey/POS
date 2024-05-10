import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import SelectTabel from "../SelectTabel/SelectTabel";

const EditTable = () => {
  const [dropdowns, setDropdowns] = useState([{ isOpen: false, value: "" }]);

  const handleChange = (index, option) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const shift = ["Shift 1", "Shift 2", "Shift 3", "Shift 4"];
  return (
    <>
      <div className="mb-9 mt-9 overflow-hidden">
        <label className="block mb-2 text-sm text-base font-medium text-gray-900 ">
          Shifts
        </label>
        {dropdowns.map((dropdown, index) => (
          <Dropdown
            className="w-566"
            key={index}
            options={shift}
            selectedOption={dropdown.value}
            isOpen={dropdown.isOpen}
            onSelect={(option) => handleChange(index, option)}
            toggleDropdown={() =>
              setDropdowns((prevDropdowns) =>
                prevDropdowns.map((d, i) =>
                  i === index ? { ...d, isOpen: !d.isOpen } : d
                )
              )
            }
          />
        ))}
        <div className="mt-14">
          <label className="block mb-2 text-sm text-base font-medium text-gray-900 ">
            Table
          </label>
          <input
            type="text"
            id="tables"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Type the number of the table"
          />
          <SelectTabel />
        </div>
      </div>
    </>
  );
};

export default EditTable;
