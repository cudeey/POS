import React from "react";

const Search = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-between container xs:flex-col lg:flex-row">
      <p className="text-gray-color text-base leading-6 mt-6 xs:justify-center xs:flex ">Lista</p>
      <div className="relative  w-466 lg:w-466 xs:w-[295px] flex items-center mt-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-light-gray-two"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block text-black w-full placeholder-light-gray-two p-2 pl-10 text-sm text-900 border border-black rounded-lg"
          placeholder="Search..."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Search;
