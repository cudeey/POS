import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  searchIngredients,
} from "../../store/slices/getIngredients";
import { Link } from "react-router-dom";

const FilterIngredients = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("ingredients");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilterName, setSelectedFilterName] = useState("Ingredient");

  const searchResults = useSelector((state) => state.apiGetIngredients.data);

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        dispatch(getIngredients());
      } else {
        dispatch(searchIngredients({ type: searchType, query: searchTerm }));
      }
    } catch (error) {}
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    if (inputValue.trim() === "") {
      dispatch(getIngredients());
    } else {
      handleSearch();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectType = (type, name) => {
    setSearchType(type);
    setSelectedFilterName(name);
    toggleDropdown();
  };

  return (
    <div className="container flex justify-between">
      <div></div>
      <div className="ml-[160px] mt-4 relative">
        <div className="relative w-466 lg:w-[420px] lg:h-[48px] flex items-center xs:w-[295px] xs:mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
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
            className="block text-black w-full placeholder-light-gray-two p-3 pl-10 text-sm text-900 border border-light-gray-two rounded-3xl"
            placeholder={`Search ${selectedFilterName}...`}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {searchResults.length === 0 && searchTerm.trim() !== "" && (
          <p className="text-red-500 text-sm mt-2 flex justify-center">Error 404: Product not found</p>
        )}
      </div>
      <div className="mt-4 flex relative">
        <div onClick={toggleDropdown}>
          <img src="images/Cart.svg" className="cursor-pointer" />
        </div>
        {dropdownOpen && (
          <div className="absolute z-10 mt-[60px] ml-[-44px] bg-white divide-y divide-gray-100 rounded-lg shadow w-36 flex justify-center">
            <ul
              className="py-4 px-4 text-xs dark:text-gray-200 "
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className={`block px-8 py-2 text-gray-500 hover:bg-light-orange hover:text-white hover:rounded-md cursor-pointer ${
                    searchType === "ingredients"
                      ? "bg-light-orange text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSelectType("ingredients", "Ingredient")}
                >
                  Ingredient
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block px-8 py-2 text-gray-500  hover:bg-light-orange hover:text-white hover:rounded-md cursor-pointer ${
                    searchType === "category"
                      ? "bg-light-orange text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSelectType("category", "Category")}
                >
                  Category
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block px-8 py-2 text-gray-500 hover:bg-light-orange hover:text-white hover:rounded-md cursor-pointer ${
                    searchType === "unit"
                      ? "bg-light-orange text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSelectType("unit", "Unit")}
                >
                  Unit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block px-8 py-2 text-gray-500 hover:bg-light-orange hover:text-white hover:rounded-md cursor-pointer ${
                    searchType === "cost"
                      ? "bg-light-orange text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSelectType("cost", "Cost")}
                >
                  Cost
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block px-8 py-2 text-gray-500 hover:bg-light-orange hover:text-white hover:rounded-md cursor-pointer  ${
                    searchType === "supplier"
                      ? "bg-light-orange text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSelectType("supplier", "Supplier")}
                >
                  Supplier
                </a>
              </li>
            </ul>
          </div>
        )}
     
        <div>
          <Link to="/ingredient">
            <img src="images/Cart-add.svg" className="cursor-pointer" />
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FilterIngredients;
