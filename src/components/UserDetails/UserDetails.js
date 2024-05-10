import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { deleteInviteUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const UserDetails = ({ id, name, job }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    dispatch(deleteInviteUser(id));
    setShowDeleteModal(false);
    toast.success("User Deleted Successfully");
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between border items-center rounded-lg mb-4 px-4 py-3 mt-3">
          <div className="bg-white font-medium text-gray-900 whitespace-nowrap w-14">
            {name}
          </div>
          <div className="bg-white text-red-500 whitespace-nowrap">{job}</div>
          <div className="flex ">
            <Link
              to={`/edit-user/${id}`}
              className="mr-2 rounded-full bg-light-pink p-2"
            >
              <FiEdit />
            </Link>
            <button
              className="rounded-full bg-light-pink p-2 cursor-pointer"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete User"
            >
              <RiDeleteBin4Line />
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center">
              <button
                className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 mr-2"
                onClick={() => setShowDeleteModal(false)}
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

UserDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
};

export default UserDetails;
