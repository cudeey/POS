import { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlus, BsCalendar2Week } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservedTablesRow = () => {
  const [startDate, setStartDate] = useState(null);
  const [shiftOptionsVisible, setShiftOptionsVisible] = useState(false);

  const shiftRef = useRef(null);
  const toggleShiftOptions = () => {
    setShiftOptionsVisible(!shiftOptionsVisible);
  };

  const shiftOptions = ["Shift 1", "Shift 2", "Shift 3", "Shift 4"];

  return (
    <div className="flex justify-center text-center">
      <div className="flex justify-between my-4 w-1240">
        <div
          className={`flex text-center justify-center mt-2 ${
            shiftOptionsVisible ? "mb-0" : ""
          }`}
          onClick={toggleShiftOptions}
          ref={shiftRef}
        >
          <p
            className={`text-semibold text-sm ${
              shiftOptionsVisible ? "mb-0  " : ""
            }`}
            onClick={toggleShiftOptions}
          >
            Shifts
          </p>

          <IoIosArrowDown
            className={`mt-0.5 ml-2 w-4 h-4${
              shiftOptionsVisible ? "mb-0" : ""
            }`}
          />
          {shiftOptionsVisible && (
            <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172">
              {shiftOptions.map((option) => (
                <div
                  key={option}
                  className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center ml-auto">
          <BsCalendar2Week className="mr-3" />
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd.MM.yyyy"
              placeholderText="Select a date"
              className="cursor-pointer w-28"
            />
          </div>
          <IoIosArrowDown />
        </div>
        <div className="rounded-full p-2 bg-light-orange ml-6">
          <BsPlus className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ReservedTablesRow;
