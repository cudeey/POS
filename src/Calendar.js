import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservation,
  selectReservationAllData,
} from "./store/slices/getReservationData";

const Calendar = ({ onDateClick }) => {
  const dispatch = useDispatch();
  const reservationAllData = useSelector(selectReservationAllData);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getReservation());
    setEvents(
      reservationAllData.map((reservation) => ({
        title: reservationAllData.filter((r) => r.date === reservation.date)
          .length,
        date: reservation.date,
      }))
    );
  }, []);

  const handleEventClick = (eventClickInfo) => {
    const selectedEventDate = new Date(
      eventClickInfo.event.start.getTime() + 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    onDateClick(selectedEventDate);
  };

  const customButtons =
    events.length > 0
      ? {
          customButton: {
            text: "Custom Button",
          },
        }
      : {};

  const renderEventContent = (eventInfo) => {
    const numberOfReservations = eventInfo.event.title;

    return (
      <>
        {numberOfReservations > 0 && (
          <div
            style={{
              backgroundColor: "#ECB22E",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <button>
              {numberOfReservations} reservation
              {numberOfReservations > 1 ? "s" : ""}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        className="custom-full-calendar"
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        customButtons={customButtons}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
