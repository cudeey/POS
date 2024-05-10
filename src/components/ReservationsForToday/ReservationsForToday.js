import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addStrike,
  getReservationToday,
} from "../../store/slices/getReservation";
import { toast } from "react-toastify";
import { deleteReservation } from "../../store/slices/deleteReservation";
import PropTypes from "prop-types";

const ReservationsForToday = ({ timeSlot, reservations, onStrikeAdded }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const handleStrikeClick = (event, itemId, strikeNumber) => {
    event.preventDefault();
    dispatch(addStrike(itemId, strikeNumber))
      .unwrap()
      .then(() => {
        toast.success("Strike added successfully");
        dispatch(getReservationToday());
        if (onStrikeAdded) {
          onStrikeAdded();
        }
      })
      .catch((error) => {
        toast.error("Failed to add more than 3 strikes");
      });
  };

  const formatTimeWithoutAMPM = (time) => {
    if (time) {
      const [hourMinute] = time.split(" ");
      return hourMinute;
    }
    return "";
  };

  const handleDeleteReservation = (itemId) => {
    dispatch(deleteReservation(itemId))
      .unwrap()
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(getReservationToday());
        window.reload.location();
      })
      .catch((error) => {
        toast.error("Delete failed:", error);
      });
  };

  const handleShowDeleteModal = (reservationId, event) => {
    event.preventDefault();
    setShowDeleteModal(true);
    setSelectedReservationId(reservationId);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReservationId(null);
  };

  const handleDelete = () => {
    handleDeleteReservation(selectedReservationId);
    handleHideDeleteModal();
  };

  return (
    <div>
      {reservations.map((item) => (
        <form key={item.id}>
          {item === reservations[0] && (
            <div className="flex items-center gap-3 mt-8">
              <div className="flex">
                <div className="h-1 w-6 bg-gray-900 flex mt-2"></div>
                <BsClock />
              </div>
              <p>{formatTimeWithoutAMPM(timeSlot)}</p>
            </div>
          )}
          <div className="mt-5">
            <div className="flex mt-5 ml-4 lg:ml-4 xs:ml-0">
              <div className="h-70 w-72 mt-2 flex items-center justify-center text-[50px] text-white-color bg-light-orange">
                {item.table_id}
              </div>
              <div className="flex items-center justify-between ml-1 mt-2 w-403 lg:w-403 h-70 bg-light-pink border-solid border-2 border-light-gray xs:w-400">
                <div className="flex">
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h5 className="text-xl text-gray-900  ">{item.name}</h5>
                    </div>
                    <p className="text-sm text-light-orange xs:whitespace-nowrap">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 cursor-pointer mr-4 lg:mb-0 xs:mb-4 ">
                  <Link to={`/edit-reservation/${item.id}`}>
                    <button className="">
                      <FiEdit className="text-gray-color mt-1" />
                    </button>
                  </Link>
                  <button
                    className="text-gray-color"
                    onClick={(e) => handleShowDeleteModal(item.id, e)}
                    aria-label="Delete"
                  >
                    <RiDeleteBin4Line />
                  </button>
                  <div className="flex gap-1 ">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        onClick={(e) => handleStrikeClick(e, item.id, i + 1)}
                        aria-label={`Strike ${i + 1}`}
                      >
                        <BiBlock
                          className={
                            item.strikes > i ? "text-red-500" : "text-black"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ))}

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this reservation?
            </p>
            <div className="flex justify-center">
              <button
                className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 mr-2"
                onClick={handleHideDeleteModal}
              >
                No, cancel
              </button>
              <button
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReservationsForToday.propTypes = {
  timeSlot: PropTypes.string.isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      table_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      strikes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ReservationsForToday;
