import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editReservation } from "../../store/slices/editReservation";
import { getReservation } from "../../store/slices/getReservation";
import Dropdown from "../Dropdown/Dropdown";
import { getTables, getTablesByTime } from "../../store/slices/apiTables";
import TableMapCreate from "../TableMapCreate/TableMapCreate";

const EditTheReservation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dataReservation = useSelector((state) => state.apiGetReservation.data);
  const [selectedObject, setSelectedObject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [nameReservation, setNameReservation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedHourReservation, setSelectedHourReservation] = useState("");
  const [selectedMinuteReservation, setSelectedMinuteReservation] =
    useState("");
  const [descriptionReservation, setDescriptionReservation] = useState("");
  const [changeShift, setChangeShift] = useState("");
  const [selectShift, setSelectShift] = useState("");
  const [dropdownsTabel, setDropdownsTabel] = useState([
    { isOpen: true, value: "" },
  ]);
  const [tableOptions, setTableOptions] = useState([]);
  const navigate = useNavigate();
  const tables = useSelector((state) => state.apiTables.data);

  useEffect(() => {
    const foundObject = dataReservation
      .flat()
      .find((item) => item.id === parseInt(id));

    if (foundObject) {
      setSelectedObject(foundObject);
      setNameReservation(foundObject.name);
      setPhoneNumber(foundObject.phone_number);

      const [hour, minute] = foundObject.time.split(":");
      setSelectedHourReservation(hour);
      setSelectedMinuteReservation(minute);
      const dateWithTime = new Date(foundObject.date);
      dateWithTime.setHours(parseInt(hour), parseInt(minute));
      setStartDate(dateWithTime);

      setDescriptionReservation(foundObject.description);
      setChangeShift(foundObject.shift);
      setSelectShift(foundObject.shift);
    }
  }, [dataReservation, id]);

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

  const hours = Array.from({ length: 15 }, (_, i) => i + 10);
  const minutes = ["00", "30"];

  const handleEditReservation = async (e) => {
    e.preventDefault();
    let editedStartDate = startDate;
    if (!startDate || isNaN(startDate.getTime())) {
      editedStartDate = new Date();
    }

    const formattedDate = startDate
      ? startDate.toISOString().split("T")[0]
      : null;
    const formattedTime = startDate
      ? `${selectedHourReservation}:${selectedMinuteReservation} `
      : null;

    const editData = new FormData();
    editData.append("name", nameReservation);
    editData.append("phone_number", phoneNumber);
    editData.append("date", formattedDate);
    editData.append("time", formattedTime);
    editData.append("description", descriptionReservation);
    editData.append("table_id", dropdownsTabel[0].value);
    dispatch(getReservation());

    try {
      const res = await dispatch(
        editReservation({ id: id, updatedData: editData })
      ).unwrap();
      toast.success("Changes saved successfully!");
      navigate("/reservation");
      return;
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handleChangeTabel = (index, option) => {
    setDropdownsTabel((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const handleLabelClick = (text) => {
    setDescriptionReservation(text);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleEditReservation} className="mt-9 flex gap-x-16 lg:flex-row xs:flex-col">
        <div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={nameReservation}
              onChange={(e) => setNameReservation(e.target.value)}
              placeholder="Type Bussines Name"
              className="w-566 lg:w-566 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  xs:w-310"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Type the Number"
              className="w-566 lg:w-566 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 xs:w-310 "
            />
          </div>
          <div className="flex gap-3 mb-6 lg:flex-row xs:flex-col">
            <div>
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  className="w-24 h-44 lg:w-24 lg:h-44 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 xs:w-[180px] "
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
              <div className="w-full  max-w-sm mx-auto xs:ml-0">
                <div className="flex">
                  <select
                    value={selectedHourReservation}
                    onChange={(e) => setSelectedHourReservation(e.target.value)}
                    className="w-1/2 lg:w-1/2 h-44 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 xs:w-20"
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    value={selectedMinuteReservation || "00"}
                    onChange={(e) =>
                      setSelectedMinuteReservation(e.target.value)
                    }
                    className="w-1/2 lg:w-1/2 h-44 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2 xs:w-20"
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
            <div className="">
              <label
                htmlFor="table"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Table
              </label>
              {dropdownsTabel.map((dropdown, index) => (
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
              ))}
            </div>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <div>
            <div className="lg:flex flex gap-x-3 xs:grid xs:grid-cols-2 xs:w-[300px] xs:whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleLabelClick("Birthday Party")}
                className="block mb-2 text-sm rounded-md bg-pink-two px-3.5 py-2.5 font-medium text-gray-900 "
              >
                Birthday Party
              </button>
              <button
                type="button"
                onClick={() => handleLabelClick("Business Meeting")}
                className="block mb-2 text-sm font-medium rounded-md bg-pink-two px-3.5 py-2.5 text-gray-900 "
              >
                Business Meeting
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
              className="block p-2.5 lg:w-full w-full mb-6 text-sm text-gray-900 rounded-lg border border-gray-300 xs:w-310"
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

        <div className="container-create">
          <div className="">
            <TableMapCreate tables={tables} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTheReservation;
