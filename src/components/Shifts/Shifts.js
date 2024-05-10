import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservationByShift,
  getReservationByTable,
  getReservationToday,
  selectShiftQuery,
} from "../../store/slices/getReservation";
import ReservationFilter from "../ReservationFilter/ReservationFilter";
import ReservationsForToday from "../ReservationsForToday/ReservationsForToday";
import SelectedTableReservations from "../SelectedTableReservations/SelectedTableReservations";
import { createTable, getTables } from "../../store/slices/apiTables";
import TableMap from "../TableMap/TableMap";
import TableModal from "../TableModal/TableModal";
import { toast } from "react-toastify";

const Shifts = () => {
  const dispatch = useDispatch();
  const dataShift = useSelector(selectShiftQuery);
  const [selectedNumberInside, setSelectedNumberInside] = useState(null);
  const [filterFree, setFilterFree] = useState("");
  const [selectedShift, setSelectedShift] = useState(1);
  const [activeView, setActiveView] = useState("inside");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTableReservations, setSelectedTableReservations] = useState(
    []
  );
  const [showReservationsForToday, setShowReservationsForToday] =
    useState(true);
  const [selectedTableNumber, setSelectedTableNumber] = useState(null);
  const [reservationsHeaderText, setReservationsHeaderText] = useState(
    "Reservations for Today"
  );
  const tables = useSelector((state) => state.apiTables.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState({
    table_number: "",
    people_count: "",
  });
  const [paragraphText, setParagraphText] = useState("");

  const handleViewChange = (view) => {
    setActiveView(view);
    setSelectedTableReservations([]);
  };

  const handleFilterFreeChange = (value) => {
    setFilterFree(value);
  };

  const handleShiftChange = async (shift) => {
    setSelectedShift(shift);
    setFilterFree("");

    try {
      const response = await dispatch(getReservationByShift(shift.id));
      const reservationsByShift = response.payload.map((item) => ({
        ...item,
        time: item.time || "00:00",
      }));

      setSelectedTableReservations(reservationsByShift);
      setShowReservationsForToday(reservationsByShift.length > 0);
      setReservationsHeaderText(`Reservations for ${shift.title}`);
      setParagraphText(
        reservationsByShift.length === 0
          ? `There are no reservations for the selected shift`
          : ""
      );
    } catch (error) {
      console.error("Error fetching reservations by shift:", error);
    }
  };

  useEffect(() => {
    dispatch(getReservationToday());
    dispatch(getTables());
    dispatch(
      getReservationByTable({
        table_id: selectedNumberInside,
        date: currentDate,
      })
    );
  }, [dispatch, selectedNumberInside, currentDate]);

  useEffect(() => {}, [dataShift]);

  const groupedData = {};

  if (Array.isArray(dataShift) && dataShift.length > 0) {
    const itemsArray = Array.isArray(dataShift[0]) ? dataShift[0] : dataShift;

    itemsArray.forEach((item, index) => {
      const timeSlot = item.time;

      if (timeSlot !== undefined) {
        if (!groupedData[timeSlot]) {
          groupedData[timeSlot] = [];
        }
        groupedData[timeSlot].push(item);
      } else {
        console.error(`Item at index ${index} has undefined time:`, item);
      }
    });
  }

  const today = new Date().toLocaleDateString();
  const reservationsForToday = dataShift.filter((reservation) => {
    const reservationDate = new Date(reservation.date).toLocaleDateString();
    return reservationDate === today;
  });

  const isTimeInRange = (time, intervals) => {
    if (!time || !/:/.test(time)) {
      return false;
    }
    const [hour, minute] = time.split(":").map(Number);

    for (const [startTime, endTime] of intervals) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const reservationTime = new Date();
      reservationTime.setHours(hour, minute, 0, 0);

      const startTimeRange = new Date();
      startTimeRange.setHours(startHour, startMinute, 0, 0);

      const endTimeRange = new Date();
      endTimeRange.setHours(endHour, endMinute, 0, 0);

      if (
        reservationTime >= startTimeRange &&
        reservationTime <= endTimeRange
      ) {
        return true;
      }
    }

    return false;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    return `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`;
  };

  const isTableReserved = (tableNumber) => {
    const currentTime = getCurrentTime();
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);

    const currentInterval = calculateIntervals().find(
      ([startTime, endTime]) => {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        return (
          (currentHour >= startHour && currentHour < endHour) ||
          (currentHour === startHour && currentMinute >= startMinute) ||
          (currentHour === endHour && currentMinute < endMinute)
        );
      }
    );

    return reservationsForToday.some(
      (reservation) =>
        currentInterval &&
        isTimeInRange(reservation.time, [currentInterval]) &&
        reservation.table_id === tableNumber
    );
  };

  const calculateIntervals = () => {
    const intervals = [];
    const currentTime = getCurrentTime();
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);

    intervals.push(["10:00", "12:00"]);
    intervals.push(["12:00", "14:00"]);
    intervals.push(["14:00", "16:00"]);

    let startHour = Math.ceil(currentHour / 2) * 2;
    for (let i = 2; i < 8; i++) {
      const endHour = (startHour + 2) % 24;
      const startTime = `${startHour < 10 ? "0" : ""}${startHour}:00`;
      const endTime = `${endHour < 10 ? "0" : ""}${endHour}:00`;

      if (startTime !== "22:00") {
        intervals.push([startTime, endTime]);
      }

      startHour = endHour;
    }

    intervals.push(["22:00", "24:00"]);

    return intervals;
  };

  const handleReservationsHeadingClick = async () => {
    try {
      const formattedToday = new Date().toLocaleDateString();
      const response = await dispatch(getReservationToday());
      const reservationsForToday = response.payload
        .filter((reservation) => {
          const reservationDate = new Date(
            reservation.date
          ).toLocaleDateString();
          return reservationDate === formattedToday;
        })
        .map((item) => ({
          ...item,
          time: item.time || "00:00",
        }));

      setSelectedTableReservations(reservationsForToday);
      setShowReservationsForToday(reservationsForToday.length > 0);
      setReservationsHeaderText("Reservations for Today");
    } catch (error) {
      console.error("Failed to fetch reservations for today:", error);
    }
  };

  const handleNumberClick = (tableNumber) => {
    const formattedDate = currentDate.toISOString().split("T")[0];

    setShowReservationsForToday(true);
    setSelectedTableNumber(tableNumber);
    const clickedTableNumber = tableNumber;

    dispatch(
      getReservationByTable({ table_id: tableNumber, date: formattedDate })
    )
      .unwrap()
      .then((response) => {
        if (Array.isArray(response)) {
          const mappedReservations = response.map((item) => ({
            ...item,
            time: item.time || "00:00",
          }));
          setSelectedTableReservations(mappedReservations);

          const headerText =
            mappedReservations.length === 0
              ? `Table ${clickedTableNumber} (No reservations)`
              : `Reservations for Table ${clickedTableNumber}`;

          setReservationsHeaderText(headerText);

          setShowReservationsForToday(mappedReservations.length > 0);

          setParagraphText(
            mappedReservations.length === 0
              ? `Reservations for Table ${clickedTableNumber}`
              : ""
          );

          if (mappedReservations.length === 0) {
            setShowReservationsForToday(false);
            setParagraphText(`Reservations for Table ${clickedTableNumber}`);
          }
        } else {
          console.error("Response is not an array:", response);
          const errorText = response.message || "Failed to fetch reservations";
          setReservationsHeaderText(`Error: ${errorText}`);
          setShowReservationsForToday(false);
          setParagraphText(`Reservations for Table ${clickedTableNumber}`);
          setSelectedTableReservations([]);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to fetch reservations for the selected Table:",
          error
        );
        const errorTableNumber = clickedTableNumber || "Unknown Table";
        setReservationsHeaderText(`Reservations for Table ${errorTableNumber}`);
        setShowReservationsForToday(false);
        setParagraphText(`There are no reservations for the selected table`);
        setSelectedTableReservations([]);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTableData({
      table_number: "",
      people_count: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTable = async () => {
    try {
      await dispatch(createTable(tableData));
      dispatch(getTables());
      closeModal();
      toast.success("Table created successfully");
    } catch (error) {
      console.error("Failed to create a table:", error);
    }
  };

  return (
    <div>
      <ReservationFilter
        onFilterFreeChange={handleFilterFreeChange}
        onShiftChange={handleShiftChange}
      />
      <div className="container flex justify-between lg:flex-row  xs:flex-col  ">
        <div className="mt-10 w-1/3 lg:w-1/3 xs:w-full">
          <div className="flex justify-center gap-20 ">
            <button
              className="border-b border-gray-950 text-2xl cursor-pointer"
              onClick={handleReservationsHeadingClick}
            >
              {reservationsHeaderText}
            </button>
          </div>
          <div className="mt-5 reservation-container">
            {selectedTableNumber ? (
              selectedTableReservations.length > 0 ? (
                <div key="selectedTableReservations">
                  <SelectedTableReservations
                    reservations={selectedTableReservations}
                    onStrikeAdded={handleReservationsHeadingClick}
                  />
                </div>
              ) : (
                <div className="">
                  <div className="flex justify-center">
                    <p className="mt-5 xs:flex xs:text-xs xs:whitespace-nowrap">{paragraphText}</p>
                  </div>
                </div>
              )
            ) : showReservationsForToday ? (
              reservationsForToday.map((reservation) => (
                <div key={reservation.id}>
                  <ReservationsForToday
                    timeSlot={reservation.time}
                    reservations={[reservation]}
                    onStrikeAdded={handleReservationsHeadingClick}
                  />
                </div>
              ))
            ) : (
              <p className="flex justify-center">{paragraphText}</p>
            )}
          </div>
        </div>

        <div className="w-720 mt-10 lg:w-720 xs:w-full">
          <div className="flex justify-center gap-6  xs:justify-center  ">
            <div className="flex justify-center gap-20 ">
              <button
                className={`border-b border-gray-950 text-2xl cursor-pointer ${
                  activeView === "inside" ? "text-black" : "text-gray-500"
                }`}
                onClick={() => handleViewChange("inside")}
              >
                Inside
              </button>

              <button
                className={`border-b border-gray-950 text-2xl cursor-pointer ${
                  activeView === "outside" ? "text-black" : "text-gray-500"
                }`}
                onClick={() => handleViewChange("outside")}
              >
                Outside
              </button>
            </div>
          </div>
          <TableMap
            tables={tables}
            isTableReserved={isTableReserved}
            handleNumberClick={handleNumberClick}
            openModal={openModal}
          />
          <TableModal
            isModalOpen={isModalOpen}
            tableData={tableData}
            handleInputChange={handleInputChange}
            handleAddTable={handleAddTable}
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Shifts;
