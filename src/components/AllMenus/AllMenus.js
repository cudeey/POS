import React, { useRef, useState, useEffect } from "react";
import AllMenusCard from "../AllMenusCard/AllMenusCard";
import { GoFilter } from "react-icons/go";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const AllMenus = ({ selectedCategoryData }) => {
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const filterRef = useRef(null);
  const [activeData, setActiveData] = useState("Show All");
  const [menusData, setMenusData] = useState([]);
  const [isAllMenusActive, setIsAllMenusActive] = useState(true);
  const filterOptions = [
    "Appetizers",
    "Entrees",
    "Pasta",
    "Sandwiches",
    "Burgers",
    "Pizza",
    "Seafood",
    "Vegetarian",
    "Desserts",
  ];

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const [activePage, setActivePage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    let dataToMap = [];

    if (activeData === "Show All") {
      dataToMap = Array.isArray(selectedCategoryData.recipes)
        ? selectedCategoryData.recipes
        : [selectedCategoryData.recipes || selectedCategoryData];
    } else {
      dataToMap = Array.isArray(selectedCategoryData.recipes)
        ? selectedCategoryData.recipes
        : [selectedCategoryData.recipes || selectedCategoryData];
    }

    setMenusData(dataToMap);
  }, [activeData, selectedCategoryData]);

  const toggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
  };

  const handleCategoryChange = (newData) => {
    setActiveData(newData);

    if (newData === "Show All") {
      setMenusData(selectedCategoryData.recipes);
    }
  };

  const handleAllMenusClick = () => {
    setActiveData("Show All");
    setIsAllMenusActive(true);
  };

  return (
    <div>
      <div className="container w-full h-full">
        <h2 className="text-4xl lg:text-4xl md:text-xl sm:text-lg xs:text-lg font-semibold">Menu</h2>
        <div className="flex justify-between mt-4">
          <p className="text-gray-category font-normal lg:text-lg md:font-normal sm:text-sm xs:text-sm text-xl">
            Case studies from some of our amazing customers who are building
            faster.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {menusData
            .flat()
            .slice(
              (activePage - 1) * recipesPerPage,
              activePage * recipesPerPage
            )
            .map((menu, index) => (
              <Link to={`/details/${menu.id}`} key={menu.id}>
                <AllMenusCard
                  page={activePage}
                  key={index}
                  title={
                    menu?.title ||
                    menu.recipe?.title ||
                    menu.categoryData?.title ||
                    "Title not available"
                  }
                  categories={
                    menu?.categories ||
                    menu.recipe?.categories ||
                    menu.categoryData?.categories ||
                    "Categories not available"
                  }
                  photos={menu?.video || menu.recipe?.photos.video || []}
                />
              </Link>
            ))}
        </div>

        <Pagination
          activePage={activePage}
          onPageChange={handlePageChange}
          itemsPerPage={recipesPerPage}
          totalItems={menusData.length}
        />
      </div>
    </div>
  );
};

export default AllMenus;
