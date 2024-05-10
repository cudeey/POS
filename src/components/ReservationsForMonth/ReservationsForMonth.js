import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservationsByDate,
  selectShiftQuery,
} from "../../store/slices/getReservation";
import ReservationsForToday from "../ReservationsForToday/ReservationsForToday";
import Calendar from "../../Calendar";

const ReservationsForMonth = () => {
  const dispatch = useDispatch();
  const todayFormatted = new Date().toISOString().split("T")[0];
  const [reservationsHeaderText, setReservationsHeaderText] = useState(
    `Reservations - ${todayFormatted}`
  );

  const handleDateClick = (selectedDate) => {
    if (selectedDate === null) {
      const todayDate = new Date();
      const isoFormattedDate = todayDate.toISOString().split("T")[0];
      selectedDate = isoFormattedDate;
    }

    dispatch(getReservationsByDate(selectedDate));
    setReservationsHeaderText(`Reservations - ${selectedDate}`);
  };

  const reservations = useSelector(selectShiftQuery);

  useEffect(() => {
    handleDateClick(todayFormatted);
  }, []);

  return (
    <div>
      <div className="container flex justify-between xs:flex-col lg:flex-row ">
        <div className="mt-10">
          <div className="flex justify-center gap-20 ">
            <button
              className="border-b border-gray-950 text-2xl cursor-pointer"
              onClick={() => handleDateClick(todayFormatted)}
            >
              {reservationsHeaderText}
            </button>
          </div>

          <div className="mt-5 reservation-container">
            {Array.isArray(reservations) &&
              reservations.map((outerItem) => (
                <div key={outerItem.id}>
                  {Array.isArray(outerItem.reservations) &&
                    outerItem.reservations.map((innerItem) => (
                      <div key={innerItem.id}>
                        <ReservationsForToday
                          timeSlot={innerItem.time}
                          reservations={[innerItem]}
                        />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-12 w-[750px] h-[60px] xs:w-auto lg:w-[750px] lg:h-[60px]">
          <Calendar onDateClick={handleDateClick} />
        </div>
      </div>
    </div>
  );
};

export default ReservationsForMonth;