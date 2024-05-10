import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeDropdown from "../TimeDropdown/TimeDropdown";
import { editShift } from "../../store/slices/editShift";
import { getShift, getShiftById } from "../../store/slices/getShift";

const EditTheShift = () => {
  const [title, setTitle] = useState("");
  const [selectedHourShift, setSelectedHourShift] = useState("10");
  const [selectedMinuteShift, setSelectedMinuteShift] = useState("--");
  const [endHour, setEndHour] = useState("--");
  const [endMinute, setEndMinute] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const dataShift = useSelector((state) => state.apiGetShift.data);

  useEffect(() => {
    dispatch(getShiftById(parseInt(id)));
  }, [dispatch, id]);

  useEffect(() => {
    const shiftObject = dataShift
      .flat()
      .find((item) => item.id === parseInt(id));

    if (shiftObject) {
      setTitle(shiftObject.title);

      if (shiftObject.start_time) {
        const startTime = new Date(`2000-01-01T${shiftObject.start_time}`);
        const startHour = String(startTime.getHours()).padStart(2, "0");
        const startMinute = String(startTime.getMinutes()).padStart(2, "0");
        setSelectedHourShift(startHour);
        setSelectedMinuteShift(startMinute);
      } else {
        console.warn("shiftObject.start_time is undefined or null");
      }

      if (shiftObject.end_time) {
        const endTime = new Date(`2000-01-01T${shiftObject.end_time}`);
        const endHour = String(endTime.getHours()).padStart(2, "0");
        const endMinute = String(endTime.getMinutes()).padStart(2, "0");
        setEndHour(endHour);
        setEndMinute(endMinute);
      } else {
        console.warn("shiftObject.end_time is undefined or null");
      }
    }
  }, [dataShift, id]);

  useEffect(() => {
    if (dataShift === undefined || dataShift.length === 0) {
      dispatch(getShift());
    }
  }, [dataShift, id]);

  const handleEditShift = async (e) => {
    e.preventDefault();

    if (!title || title.trim() === "") {
      console.error("Title is required");
      return;
    }

    const formattedStartTime =
      selectedHourShift !== "" && selectedMinuteShift !== ""
        ? `${selectedHourShift}:${selectedMinuteShift}`
        : null;

    const formattedEndTime =
      endHour !== "" && endMinute !== "" ? `${endHour}:${endMinute}` : null;

    const shiftData = {
      title,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    const startTime = new Date(`2000-01-01T${formattedStartTime}`);
    const endTime = new Date(`2000-01-01T${formattedEndTime}`);

    if (endTime < startTime) {
      toast.error("End time cannot be earlier than start time");
      return;
    }

    try {
      const res = await dispatch(
        editShift({ id: id, updatedData: shiftData })
      ).unwrap();
      toast.success("Changes saved successfully!");
      navigate("/shift");
    } catch (error) {
      toast.error(`Edit failed: ${error.message}`);
    }
  };

  const handleNoClick = () => {
    navigate("/shift");
  };

  const hours = Array.from({ length: 15 }, (_, i) => i + 10);
  const minutes = ["--", "00", "30"];

  return (
    <div className=" flex justify-center items-center my-10">
      <form
        className="rounded-3xl bg-light-pink w-729 h-464 lg:w-729 lg:h-464 xs:w-full "
        onSubmit={handleEditShift}
      >
        <div className="ml-16 mt-16 lg:ml-16 lg:mt-14 xs:w-full xs:ml-[120px] xs:mt-10 ">
          <div>
            <label htmlFor="shiftName">Shift Name</label>
            <input
              name="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-5 block w-593 h-46  lg:w-[400px] lg:h-46 rounded-md border-0 px-3.5 mt-4 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 xs:w-auto "
            />
          </div>
          <div className="flex gap-x-16 lg:flex-row lg:gap-x-16 xs:gap-x-6 xs:flex-col">
            <div>
              <label htmlFor="startTime">Start Time</label>
              <div className="w-full max-w-sm mt-4">
                <div className="flex">
                  <TimeDropdown
                    value={selectedHourShift}
                    onChange={(e) => setSelectedHourShift(e.target.value)}
                    options={hours}
                  />
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    value={selectedMinuteShift}
                    onChange={(e) => setSelectedMinuteShift(e.target.value)}
                    className="w-1/2 lg:w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2 xs:w-20"
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
              <label htmlFor="endTime">End Time</label>
              <div className="w-full max-w-sm mt-4">
                <div className="flex">
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="w-1/2 lg:w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 xs:w-20"
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    value={endMinute}
                    onChange={(e) => setEndMinute(e.target.value)}
                    className="w-1/2 lg:w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2 xs:w-20"
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
          </div>
          <div className="flex mt-10">
            <button
              type="submit"
              className="bg-lighter-pink hover:bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16 mr-3"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={handleNoClick}
              className="bg-lighter-pink hover:bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16"
            >
              No
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTheShift;
