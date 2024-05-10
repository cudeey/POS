import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShift } from "../../store/slices/addShift";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewShift = () => {
  const [title, setTitle] = useState("");
  const [selectedHourStart, setSelectedHourStart] = useState("");
  const [selectedMinuteStart, setSelectedMinuteStart] = useState("");
  const [selectedHourEnd, setSelectedHourEnd] = useState("");
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNoClick = () => {
    navigate("/shift");
  };

  const hours = Array.from({ length: 15 }, (_, i) => i + 10);
  const minutes = ["--", "00", "30"];
  const defaultStartTime = "10";

  const handleShiftCreate = async (e) => {
    e.preventDefault();

    let formattedStartTime = `${selectedHourStart}:${selectedMinuteStart}`;
    if (selectedHourStart === "" && selectedMinuteStart !== "") {
      formattedStartTime = `${defaultStartTime}:${selectedMinuteStart}`;
    }

    let formattedEndTime = `${selectedHourEnd}:${selectedMinuteEnd}`;
    if (selectedHourEnd === "" && selectedMinuteEnd !== "") {
      formattedEndTime = `${defaultStartTime}:${selectedMinuteEnd}`;
    }

    const startHour = parseInt(selectedHourStart, 10);
    const startMinute = parseInt(selectedMinuteStart, 10);
    const endHour = parseInt(selectedHourEnd, 10);
    const endMinute = parseInt(selectedMinuteEnd, 10);

    if (
      startHour > endHour ||
      (startHour === endHour && startMinute >= endMinute)
    ) {
      toast.error("Start time cannot be greater than end time");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("start_time", formattedStartTime);
    formData.append("end_time", formattedEndTime);

    try {
      await dispatch(addShift(formData));

      setTitle("");
      setSelectedHourStart("");
      setSelectedMinuteStart("");
      setSelectedHourEnd("");
      setSelectedMinuteEnd("");

      navigate("/shift");
      toast.success("Shift created successfully ");
    } catch (error) {
      toast.error("Error creating shift: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <form
        className="rounded-3xl bg-light-pink w-729 h-464"
        onSubmit={handleShiftCreate}
      >
        <div className="ml-16 mt-16">
          <div>
            <label>Shift name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-5 block w-593 h-46 rounded-md border-0 px-3.5 mt-4 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex gap-x-16">
            <div>
              <label>Start</label>
              <div className="w-full max-w-sm mt-4">
                <div className="flex">
                  <select
                    className="w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2"
                    value={selectedHourStart || defaultStartTime}
                    required
                    onChange={(e) => setSelectedHourStart(e.target.value)}
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    className="w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2"
                    value={selectedMinuteStart}
                    required
                    onChange={(e) => setSelectedMinuteStart(e.target.value)}
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
              <label>End</label>
              <div className="w-full max-w-sm mt-4">
                <div className="flex">
                  <select
                    className="w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 mr-2"
                    value={selectedHourEnd || defaultStartTime}
                    required
                    onChange={(e) => setSelectedHourEnd(e.target.value)}
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600 flex items-center">:</span>
                  <select
                    className="w-1/2 bg-white border border-gray-300 rounded-md px-4 py-2 ml-2 mr-2"
                    value={selectedMinuteEnd}
                    required
                    onChange={(e) => setSelectedMinuteEnd(e.target.value)}
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
            <button className="bg-lighter-pink hover:bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16 mr-3">
              Yes
            </button>
            <button
              className="bg-lighter-pink hover:bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewShift;
