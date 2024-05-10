 import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShiftItem from "../ShiftItem/ShiftItem";
import Pagination from "../../components/Pagination/Pagination";
import { getShift } from "../../store/slices/getShift";
import { toast } from "react-toastify";
import { deleteShift } from "../../store/slices/deleteShift";

const NewShift = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.apiGetShift.data) || [];

  useEffect(() => {
    if (!shifts.length) {
      dispatch(getShift());
    }
  }, [dispatch, shifts.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShifts = shifts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteShift = (shiftId) => {
    dispatch(deleteShift(shiftId))
      .unwrap()
      .then(() => {
        toast.success("Deleted Successfully");
        dispatch(getShift()).catch((error) => {
          toast.error(`Refresh failed: ${error.message}`);
        });
      })
      .catch((error) => {
        toast.error(`Delete failed: ${error.message}`);
      });
  };

  return (
    <div className="container">
      <div className="mt-8">
        <p className="text-gray-color text-base leading-6">
          List of all the Shifts.
        </p>
      </div>

      <div className="mt-8 mb-14">
        {currentShifts.length > 0 ? (
          <ShiftItem shiftData={currentShifts} handleDeleteShift={handleDeleteShift} />
        ) : (
          <div>No matching shifts found.</div>
        )}
      </div>
      <div>
        <Pagination
          activePage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={shifts.length}
        />
      </div>
    </div>
  );
};

export default NewShift;
