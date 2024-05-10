import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import Dropdown from "../Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../../store/slices/addReservation";
import { useNavigate } from "react-router-dom";
import { getShift } from "../../store/slices/getShift";
import { getTables, getTablesByTime } from "../../store/slices/apiTables";
import TableMapCreate from "../TableMapCreate/TableMapCreate";

const NewReservation = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedHourReservation, setSelectedHourReservation] = useState("10");
  const [selectedMinuteReservation, setSelectedMinuteReservation] =
    useState("00");
  const [nameReservation, setNameReservation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [descriptionReservation, setDescriptionReservation] = useState("");
  const [dropdownsTabel, setDropdownsTabel] = useState([
    { isOpen: true, value: "" },
  ]);
  const [selectedShift, setSelectedShift] = useState([
    { isOpen: true, value: "" },
  ]);
  const hours = Array.from({ length: 15 }, (_, i) => i + 10);
  const minutes = ["00", "30"];
  const [tableOptions, setTableOptions] = useState([]);
  const tables = useSelector((state) => state.apiTables.data);
  const shiftSelect = useSelector((state) => state.apiGetShift.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShift());
  }, [dispatch]);

  const handleLabelClick = (text) => {
    setDescriptionReservation(text);
  };

  const handleChangeTabel = (index, option) => {
    setDropdownsTabel((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && selectedHourReservation && selectedMinuteReservation) {
        const formattedDate = new Date(
          startDate.getTime() - startDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        const formattedTime = `${selectedHourReservation}:${selectedMinuteReservation}`;

        try {
          const response = await dispatch(
            getTablesByTime({ date: formattedDate, time: formattedTime })
          ).unwrap();
          const freeTables = response.freeTables;
          setTableOptions(freeTables);
        } catch (error) {
          console.error("Error fetching tables by time:", error);
        }
      }

      dispatch(getTables());
    };

    fetchData();
  }, [startDate, selectedHourReservation, selectedMinuteReservation, dispatch]);

  const handleCreateReservation = async (e) => {
    e.preventDefault();

    const frontendTimezoneOffset = startDate.getTimezoneOffset();
    const adjustedDate = new Date(
      startDate.getTime() - frontendTimezoneOffset * 60000
    );

    const formattedDate = adjustedDate
      ? adjustedDate.toISOString().split("T")[0]
      : null;

    const formattedTime = startDate
      ? `${selectedHourReservation}:${selectedMinuteReservation}`
      : null;

    const formData = new FormData();
    formData.append("name", nameReservation);
    formData.append("phone_number", phoneNumber);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);
    formData.append("description", descriptionReservation);
    formData.append("table_id", dropdownsTabel[0].value);
    formData.append("shift", selectedShift[0].value);

    try {
      await dispatch(createReservation(formData));
      setNameReservation("");
      setPhoneNumber("");
      setStartDate(null);
      setSelectedHourReservation("");
      setSelectedMinuteReservation("");
      setDescriptionReservation("");
      setSelectedShift("");
      navigate("/reservation");
      return;
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="flex justify-center gap-x-16  ">
      <form onSubmit={handleCreateReservation} className="flex gap-x-16 lg:flex-row xs:flex-col ">
        <div className=" mb-9 mt-9 ">
          <div className="mb-6 lg:w-full xs:w-10">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={nameReservation}
              onChange={(e) => setNameReservation(e.target.value)}
              required
              className="lg:w-566 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 xs:w-310"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="lg:w-566 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 xs:w-310"
            />
          </div>
          <div className="flex gap-3 mb-6 lg:flex-row xs:flex-col">
            <div>
              <label
                htmlFor="startDate"
                className="block mb-2  text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  className="lg:w-24 lg:h-44 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 xs:w-[180px]  "
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="selectedHourReservation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <div className="w-full max-w-sm mx-auto xs:ml-0">
                <div className="flex">
                  <select
                    className="lg:w-1/2 h-44 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 xs:w-20 "
                    value={selectedHourReservation}
                    required
                    onChange={(e) => setSelectedHourReservation(e.target.value)}
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    className="w-1/2 h-44 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2 xs:w-20"
                    value={selectedMinuteReservation}
                    required
                    onChange={(e) =>
                      setSelectedMinuteReservation(e.target.value)
                    }
                  >
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="table"
                className="block mb-2 text-sm  font-medium text-gray-900 "
              >
                Table
              </label>
              <Dropdown
                options={tableOptions}
                selectedOption={dropdownsTabel[0].value}
                isOpen={dropdownsTabel[0].isOpen}
                onSelect={(option) => handleChangeTabel(0, option)}
                toggleDropdown={() =>
                  setDropdownsTabel((prevDropdowns) =>
                    prevDropdowns.map((d, i) =>
                      i === 0 ? { ...d, isOpen: !d.isOpen } : d
                    )
                  )
                }
              />
            </div>
          </div>
          <label
            htmlFor="message"
            className="block mb-2 mt-6 text-sm font-medium text-gray-900  "
          >
            Description
          </label>
          <div>
            <div className="lg:flex gap-x-3 xs:grid xs:grid-cols-2 xs:w-[300px] xs:whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleLabelClick("Birthday Party")}
                className="block mb-2 text-sm rounded-md bg-pink-two px-3.5 py-2.5 font-medium text-gray-900 "
              >
                Birthday Party
              </button>
              <button
                type="button"
                onClick={() => handleLabelClick("Bussines Meeting")}
                className="block mb-2 text-sm font-medium rounded-md bg-pink-two px-3.5 py-2.5 text-gray-900 "
              >
                Bussines Meeting
              </button>
              <button
                type="button"
                onClick={() => handleLabelClick("Date")}
                className="block mb-2 text-sm font-medium rounded-md bg-pink-two px-3.5 py-2.5 text-gray-900 "
              >
                Date
              </button>
              <button
                type="button"
                onClick={() => handleLabelClick("Family Dinner")}
                className="block mb-2 text-sm font-medium rounded-md bg-pink-two px-3.5 py-2.5 text-gray-900 "
              >
                Family Dinner
              </button>
            </div>
            <textarea
              id="message"
              rows="4"
              value={descriptionReservation}
              onChange={(e) => setDescriptionReservation(e.target.value)}
              className="block p-2.5 lg:w-full mb-6 text-sm text-gray-900 rounded-lg border border-gray-300 xs:w-310"
            ></textarea>
          </div>
          <div className="flex mt-3">
            <button
              type="submit"
              className="block w-74 mr-6 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div className="container-edit  ">
          <div className="">
            <TableMapCreate tables={tables} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReservation;
