import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardRows from "../CardRows/CardRows";
import Filter from "../Filter/Filter";
import CardColums from "../CardColums/CardColums";
import Pagination from "../Pagination/Pagination";

const Recipes = () => {
  const [displayRows, setDisplayRows] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [recipeCount, setRecipeCount] = useState(0);
  const totalRecipes = useSelector(
    (state) => state.apiRecipes.data.recipes?.length || 0
  );

  const handleHorizontalClick = () => {
    setDisplayRows(true);
  };

  const handleVerticalClick = () => {
    setDisplayRows(false);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleRecipeCountChange = (count) => {
    setRecipeCount(count);
  };

  return (
    <div>
      <Filter
        onHorizontalClick={handleHorizontalClick}
        onVerticalClick={handleVerticalClick}
        recipeCount={recipeCount}
      />

      <div>
        {displayRows ? (
          <>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-8">
                <CardColums
                  page={activePage}
                  onRecipeCountChange={handleRecipeCountChange}
                />
              </div>
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={handlePageChange}
              itemsPerPage={4}
              totalItems={totalRecipes}
            />
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="grid grid-flow-row gap-8">
                <CardRows
                  page={activePage}
                  onRecipeCountChange={handleRecipeCountChange}
                />
              </div>
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={handlePageChange}
              itemsPerPage={4}
              totalItems={totalRecipes}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Recipes;
