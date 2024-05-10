import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/slices/authSlice";
import NavBar from "../../components/NavBar/NavBar";
import UserDetails from "../../components/UserDetails/UserDetails";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data) || [];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl xs:text-base font-normal">Go back</p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal mr-28">Users</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 justify-end text-left">
        <Search onSearch={handleSearch} />
      </div>
      <div className="mt-8">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <UserDetails
              key={user.id}
              id={user.id}
              name={user.name}
              job={user.job_title || "No job title"}
            />
          ))
        ) : (
          <div className="flex justify-center items-center">No user found.</div>
        )}
      </div>
      <div>
        <Pagination
          activePage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
        />
      </div>
    </div>
  );
};

export default Users;
