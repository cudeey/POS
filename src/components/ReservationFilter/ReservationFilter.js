import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiBlock } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShift } from "../../store/slices/getShift";
import { getReservationByShift } from "../../store/slices/getReservation";
import { MdOutlineCalendarMonth } from "react-icons/md";

const ReservationFilter = ({
  onHorizontalClick,
  onVerticalClick,
  onFilterFreeChange,
  onShiftChange,
  onSearch,
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [addMoreOptionsVisible, setAddMoreOptionsVisible] = useState(false);
  const [shiftOptionsVisible, setShiftOptionsVisible] = useState(false);
  const [filterFree, setFilterFree] = useState("");
  const [selectedShift, setSelectedShift] = useState("Select Shift");
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.apiGetShift.data);

  useEffect(() => {
    dispatch(getShift());
  }, [dispatch]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const filterRef = useRef(null);
  const addMoreRef = useRef(null);
  const shiftRef = useRef(null);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  const filterFreeOption = () => {
    setFilterFree("free");
    onFilterFreeChange("free");
  };

  const filterReservedOption = () => {
    setFilterFree("reserved");
    onFilterFreeChange("reserved");
  };

  const handleHorizontalClick = () => {
    setActiveFilter("horizontal");
    onHorizontalClick();
    setFilterOptionsVisible(!filterOptionsVisible);
    setAddMoreOptionsVisible(false);
  };

  const handleVerticalClick = () => {
    setActiveFilter("vertical");
    onVerticalClick();
    setAddMoreOptionsVisible(!addMoreOptionsVisible);
    setFilterOptionsVisible(false);
  };

  const toggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
    setAddMoreOptionsVisible(false);
  };

  const toggleAddMoreOptions = () => {
    setAddMoreOptionsVisible(!addMoreOptionsVisible);
    setFilterOptionsVisible(false);
  };
  const toggleShiftOptions = () => {
    setShiftOptionsVisible(!shiftOptionsVisible);
    setFilterOptionsVisible(false);
    setAddMoreOptionsVisible(false);
    setShiftOptionsVisible(!shiftOptionsVisible);
  };

  const handleShiftClick = (option) => {
    setShiftOptionsVisible(false);
    setSelectedShift(option.title);
    onShiftChange(option);
    if (option.id) {
      dispatch(getReservationByShift(option.id));
    } else {
      console.error("Shift id is not defined:", option);
    }
  };

  const addMoreOptions = [
    {
      text: "Black List",
      icon: <BiBlock className=" mr-2 w-4 h-4" />,
      link: "/blacklist",
    },
    {
      text: "Clients List",
      icon: <CgUserList className="mr-2 w-4 h-4" />,
      link: "/client-list",
    },
    {
      text: "Monthly Reservations",
      icon: <MdOutlineCalendarMonth className="mr-2 w-4 h-4" />,
      link: "/monthly-reservations",
    },
  ];
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        addMoreRef.current &&
        !addMoreRef.current.contains(event.target) &&
        shiftRef.current &&
        !shiftRef.current.contains(event.target)
      ) {
        setFilterOptionsVisible(false);
        setAddMoreOptionsVisible(false);
        setShiftOptionsVisible(false);
      }
    };

    const handleAddMoreClick = (event) => {
      if (addMoreRef.current && !addMoreRef.current.contains(event.target)) {
        setAddMoreOptionsVisible(false);
      }
    };

    const handleShiftClick = (event) => {
      if (shiftRef.current && !shiftRef.current.contains(event.target)) {
        setShiftOptionsVisible(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("click", handleAddMoreClick);
    document.addEventListener("click", handleShiftClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("click", handleAddMoreClick);
      document.removeEventListener("click", handleShiftClick);
    };
  }, []);

  return (
    <div className="flex justify-center text-center">
      <div className="flex justify-between my-4 w-1240">
        <div className="flex">
          <div className="">
            <Link
              to="/create-reservation"
              className="block w-74 mr-6 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm  lg:ml-0 lg:text-sm mt-1 font-semibold text-white xs:text-xs xs:px-2 xs:py-2 xs:w-16 xs:ml-4" 
            >
              Create
            </Link>
          </div>
          <div
            className={`flex  mt-3 ${shiftOptionsVisible ? "mb-0" : ""}`}
            onClick={toggleShiftOptions}
            ref={shiftRef}
          >
            <p
              className={`text-semibold text-base lg:text-base xs:text-sm ${
                shiftOptionsVisible ? "mb-0" : ""
              }`}
              onClick={toggleShiftOptions}
            >
              {selectedShift}
            </p>

            <IoIosArrowDown
              className={`mt-1 ml-2 w-4 h-4 cursor-pointer xs:mt-1 xs:h-3${
                shiftOptionsVisible ? "mb-0" : ""
              }`}
            />
            {shiftOptionsVisible && (
              <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172 xs:w-40 ">
                {shifts.map((option) => (
                  <div
                    key={option.id}
                    className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                    onClick={() => handleShiftClick(option)}
                  >
                    <div className="flex gap-2 justify-between">
                      {`${option.title} (${formatTime(
                        option.start_time
                      )} - ${formatTime(option.end_time)})`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="flex justify-end items-center w-full lg:text-base xs:text-sm">
            <div>
              <Link to="/table-dashboard">Tables</Link>
            </div>
            <div
              className={`flex ml-6 mr-6 cursor-pointer ${
                addMoreOptionsVisible ? " justify-center" : ""
              }`}
              onClick={toggleAddMoreOptions}
              ref={addMoreRef}
            >
              <p
                className={`text-base lg:text-base xs:text-sm ${addMoreOptionsVisible ? "mb-0  " : ""}`}
                onClick={toggleAddMoreOptions}
              >
                More
              </p>
              <IoIosArrowDown
                className={`mt-1 ml-2 xs:h-3 xs:mt-1${addMoreOptionsVisible ? "mb-0" : ""}`}
              />
              {addMoreOptionsVisible && (
                <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172 xs:w-30 xs:mr-8">
                  {addMoreOptions.map((option) =>
                    option.link ? (
                      <Link to={option.link} key={option.text}>
                        <div className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer">
                          {option.icon} {option.text}
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={option.text}
                        className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                      >
                        {option.icon} {option.text}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationFilter;
