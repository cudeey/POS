import React, { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getShift } from "../../store/slices/getShift";
import { useDispatch } from "react-redux";

const ShiftItem = ({ shiftData, handleDeleteShift }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);

  useEffect(() => {
    dispatch(getShift());
  }, [dispatch]);

  const handleShowDeleteModal = (shiftId) => {
    setShowDeleteModal(true);
    setSelectedShiftId(shiftId);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedShiftId(null);
  };

  const handleDelete = () => {
    handleDeleteShift(selectedShiftId);
    handleHideDeleteModal();
  };

  return (
    <>
      {shiftData?.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border rounded-lg mb-4 px-4 py-2"
        >
          <div className="bg-white font-medium text-gray-900 whitespace-nowrap w-14">
            {item.title}
          </div>
          <div className="bg-white text-red-500 whitespace-nowrap">
            {item.start_time.slice(0, 5)}
          </div>
          <div className="bg-white text-red-500 whitespace-nowrap">
            {item.end_time.slice(0, 5)}
          </div>
          <div className="flex space-x-2">
              <Link
              to={`/edit-shift/${item.id}`}
              className="mr-2 rounded-full bg-light-pink p-3"
            >
              <FiEdit />
            </Link>
            <button
              className="rounded-full bg-light-pink p-3 cursor-pointer"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete User"
            >
              <RiDeleteBin4Line />
            </button>
          </div>
        </div>
      ))}

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this shift?
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
    </>
  );
};

ShiftItem.propTypes = {
  shiftData: PropTypes.array.isRequired,
  handleDeleteShift: PropTypes.func.isRequired,
};

export default ShiftItem;
