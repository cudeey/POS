// import React, { useState, useEffect, useRef } from "react";
// import { GoFilter } from "react-icons/go";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setFilteredRecipe } from "../../store/slices/filterSlice";

// const Filter = () => {
//   const dispatch = useDispatch();
//   const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("Recipes");
//   const filterRef = useRef(null);

//   const toggleFilterOptions = (option) => {
//     setFilterOptionsVisible(!filterOptionsVisible);

//     if (option === "Active Recipes") {
//       dispatch(setFilteredRecipe(1));
//     } else if (option === "Passive Recipes") {
//       dispatch(setFilteredRecipe(0));
//     }
//     setSelectedFilter(option);
//   };

//   const filterOptions = ["Active Recipes", "Passive Recipes"];

//   useEffect(() => {
//     const handleGlobalClick = (event) => {
//       if (filterRef.current && !filterRef.current.contains(event.target)) {
//         setFilterOptionsVisible(false);
//       }
//     };

//     document.addEventListener("click", handleGlobalClick);

//     return () => {
//       document.removeEventListener("click", handleGlobalClick);
//     };
//   }, []);

//   const handleOptionKeyDown = (event, option) => {
//     if (event.key === "Enter") {
//       toggleFilterOptions(option);
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="flex justify-between my-4 w-1240">
//         <div className="flex ">
//           <p className="font-normal text-base text-gray-color mt-2 leading-6">
//             {selectedFilter}
//           </p>
//         </div>
//         <div className="flex justify-end items-center w-full">
//           <div
//             className={`flex bg-white ${
//               filterOptionsVisible ? "justify-center" : ""
//             }`}
//             onClick={() => toggleFilterOptions()}
//             ref={filterRef}
//           >
//             <p
//               className={`text-base cursor-pointer	${
//                 filterOptionsVisible ? "mb-0" : ""
//               }`}
//               onClick={() => toggleFilterOptions()}
//             >
//               Filter
//             </p>
//             <GoFilter
//               className={`mt-1 ml-2 ${filterOptionsVisible ? "mb-0" : ""}`}
//             />
//             {filterOptionsVisible && (
//               <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172">
//                 {filterOptions.map((option) => (
//                   <div
//                     key={option}
//                     className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
//                     onClick={() => toggleFilterOptions(option)}
//                     onKeyDown={(event) => handleOptionKeyDown(event, option)}
//                     tabIndex={0}
//                     role="button"
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex justify-center items-center">
//             <Link to="/create" className="cursor-pointer">
//               <div className="text-base ml-10">Add Recipe</div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// ... (your imports)

import React, { useState, useEffect, useRef } from "react";
import { GoFilter } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilteredRecipe } from "../../store/slices/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const filterRef = useRef(null);

  const toggleFilterOptions = (option) => {
    setFilterOptionsVisible(!filterOptionsVisible);

    if (option === "Active Recipes") {
      dispatch(setFilteredRecipe(1));
      setSelectedFilter("Active");
    } else if (option === "Passive Recipes") {
      dispatch(setFilteredRecipe(0));
      setSelectedFilter("Passive");
    }
  };

  const filterOptions = ["Active Recipes", "Passive Recipes"];

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOptionsVisible(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleOptionKeyDown = (event, option) => {
    if (event.key === "Enter") {
      toggleFilterOptions(option);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-between my-4 w-1240">
        <div className="flex">
          <p className="font-normal text-base text-gray-color mt-2 leading-6">
            {selectedFilter}
          </p>
        </div>
        <div className="flex justify-end items-center w-full">
              <div className="flex justify-center items-center">
            <Link to="/ingredients" className="cursor-pointer">
              <div className="text-sm ml-6   text-white bg-light-orange rounded-md p-2 ">Ingredients</div>
            </Link>
          </div>
          <div
            className={`flex bg-white ml-6${
              filterOptionsVisible ? "justify-center" : ""
            }`}
            onClick={() => toggleFilterOptions()}
            ref={filterRef}
          >
            <p
              className={`text-base cursor-pointer	${
                filterOptionsVisible ? "mb-0" : ""
              }`}
              onClick={() => toggleFilterOptions()}
            >
              Filter
            </p>
            <GoFilter
              className={`mt-1 ml-2 ${filterOptionsVisible ? "mb-0" : ""}`}
            />
            {filterOptionsVisible && (
              <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172">
                {filterOptions.map((option) => (
                  <div
                    key={option}
                    className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                    onClick={() => toggleFilterOptions(option)}
                    onKeyDown={(event) => handleOptionKeyDown(event, option)}
                    tabIndex={0}
                    role="button"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>    
          <div className="flex justify-center items-center">
            <Link to="/create" className="cursor-pointer">
              <div className="text-base ml-6">Add Recipe</div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Filter;
