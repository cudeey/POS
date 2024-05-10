import { useState, useEffect, useRef } from "react";
import { GoFilter } from "react-icons/go";

const AllMenus = () => {
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const filterRef = useRef(null);

  const toggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
  };

  const filterOptions = [
    "Appetizers",
    "Entrees",
    "Pasta",
    "Sandwiches",
    "Burgers",
    "Pizza",
    "Seafood",
    "Vegetarian",
    "Deserts",
  ];

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-text")
      ) {
        setFilterOptionsVisible(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div>
      <div className="container w-full h-full">
        <h2 className="text-4xl  font-semibold mt-8">Menu</h2>
        <div className="flex justify-between">
          <p className="text-gray-category font-normal text-xl mt-4">
            Case studies from some of our amazing customers who are building
            faster.
          </p>
          <div
            className={`flex bg-white ${
              filterOptionsVisible ? "justify-center" : ""
            }`}
            onClick={toggleFilterOptions}
            ref={filterRef}
          >
            <p
              className={`text-base ${
                filterOptionsVisible
                  ? "mb-0 text-light-orange filter-text"
                  : "filter-text"
              }`}
              onClick={toggleFilterOptions}
            >
              Filter
            </p>
            <GoFilter
              className={`mt-1 ml-2 ${
                filterOptionsVisible ? "icon-color" : ""
              }`}
            />
            {filterOptionsVisible && (
              <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172">
                {filterOptions.map((option) => (
                  <div
                    key={option}
                    className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AllMenus;
