import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import SelectTabel from "../SelectTabel/SelectTabel";

const NewTable = () => {
  const [dropdowns, setDropdowns] = useState([{ isOpen: false, value: "" }]);
  const [dropdownsTabel, setDropdownsTabel] = useState([
    { isOpen: false, value: "" },
  ]);

  const handleChange = (index, option) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const handleChangeTabel = (index, option) => {
    setDropdownsTabel((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const shift = ["Shift 1", "Shift 2", "Shift 3", "Shift 4"];
  const tabel = [
    "Tabel 1",
    "Tabel 2",
    "Tabel 3",
    "Tabel 4",
    "Tabel 5",
    "Tabel 6",
    "Tabel 7",
    "Tabel 8",
    "Tabel 9",
    "Tabel 10",
    "Tabel 11",
    "Tabel 12",
    "Tabel 13",
    "Tabel 14",
    "Tabel 15",
    "Tabel 16",
    "Tabel 17",
    "Tabel 18",
    "Tabel 19",
    "Tabel 20",
    "Tabel 21",
    "Tabel 22",
  ];

  return (
    <>
      <div className="mb-9 mt-9 overflow-hidden">
        <label className="block mb-2 text-sm text-base font-medium text-gray-900 ">
          Shifts
        </label>
        {dropdowns.map((dropdown, index) => (
          <Dropdown
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
            className="h-10"
          />
        ))}
        <div className="mt-14">
          <label className="block mb-2 text-sm text-base font-medium text-gray-900 ">
            Table
          </label>
          {dropdownsTabel.map((dropdown, index) => (
            <Dropdown
              key={index}
              options={tabel}
              selectedOption={dropdown.value}
              isOpen={dropdown.isOpen}
              onSelect={(option) => handleChangeTabel(index, option)}
              toggleDropdown={() =>
                setDropdownsTabel((prevDropdowns) =>
                  prevDropdowns.map((d, i) =>
                    i === index ? { ...d, isOpen: !d.isOpen } : d
                  )
                )
              }
              className="h-10"
            />
          ))}
          <SelectTabel />
        </div>
      </div>
    </>
  );
};

export default NewTable;
