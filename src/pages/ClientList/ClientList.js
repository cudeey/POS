import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Clients from "../../components/Clients/Clients";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import {
  getReservation,
  selectShiftQuery,
} from "../../store/slices/getReservation";
import Pagination from "../../components/Pagination/Pagination";

const ClientList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const reservations = useSelector(selectShiftQuery) || [];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  const filteredClientData = reservations.filter((reservation) =>
    reservation?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!reservations.length) {
      dispatch(getReservation());
    }
  }, [dispatch, reservations.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShifts = filteredClientData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-container">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <button className="flex items-center" onClick={handleGoBack}>
            <img
              src="images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5 w-7 h-7 lg:w-7 xs:w-5"
            />
            <p className="text-xl lg:text-xl font-normal xs:text-base">Go back</p>
          </button>

          <div className="flex-1 justify-center text-center">
            <h1 className="text-xl lg:text-xl font-normal xs:text-lg">Client List</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 justify-end text-left">
        <Search onSearch={handleSearch} />
      </div>
      <div>
        {currentShifts.map((client) => (
          <Clients
            key={client?.id}
            id={client?.id}
            name={client?.name}
            number={client?.phone_number}
            stars={client?.stars}
          />
        ))}
      </div>
      <Pagination
        activePage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={filteredClientData.length}
      />
    </div>
  );
};

export default ClientList;
