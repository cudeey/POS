import Blacklist from "../../components/Blacklist/Blacklist";
import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  getReservation,
  selectShiftQuery,
} from "../../store/slices/getReservation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlackList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const blacklist = useSelector(selectShiftQuery) || [];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (!blacklist.length) {
      dispatch(getReservation());
    }
  }, [dispatch, blacklist.length]);

  const filteredUsers = blacklist.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShifts = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-contianer">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <button className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl font-normal xs:text-base">Go back</p>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl lg:text-xl font-normal xs:text-lg">Black List</h1>
          </div>
        </div>
      </div>
      <Blacklist blacklist={currentShifts} onSearch={handleSearch} />
      <Pagination
        activePage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
      />
    </div>
  );
};

export default BlackList;
