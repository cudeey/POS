import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import {
  deleteDataRecipes,
  fetchDataRecipes,
} from "../../store/slices/apiRecipes";
import { useDispatch, useSelector } from "react-redux";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";
import { selectFilteredRecipe } from "../../store/slices/filterSlice";

const CradRows = ({ page, onRecipeCountChange }) => {
  const [editHovered, setEditHovered] = useState(null);
  const [deleteHovered, setDeleteHovered] = useState(null);
  const [hoveredDeleteButton, setHoveredDeleteButton] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecipeId, setDeleteRecipeId] = useState(null);
  const dataRecipes = useSelector((state) => state.apiRecipes.data.recipes);
  const dispatch = useDispatch();
  const baseUrl = "https://backrecrez.bbros.al";

  const recipesPerPage = 4;
  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = Math.min(startIndex + recipesPerPage, dataRecipes.length);
  const currentPageData = dataRecipes.slice(startIndex, endIndex);

  const filteredRecipe = useSelector(selectFilteredRecipe);

  const handleVisibilityFilter = (recipe) => {
    return filteredRecipe === "" || recipe.visibility === filteredRecipe;
  };

  useEffect(() => {
    dispatch(fetchDataRecipes()).then((response) => {
      const recipeCount = response.payload.recipes.length;
      onRecipeCountChange(recipeCount);
    });
  }, [dispatch, page, onRecipeCountChange]);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleEditMouseEnter = (itemId) => {
    setEditHovered(itemId);
  };

  const handleEditMouseLeave = () => {
    setEditHovered(null);
  };

  const handleDeleteClick = (itemId) => {
    const updatedDataRecipes = dataRecipes.filter(
      (recipe) => recipe.id !== itemId
    );
    setShowDeleteModal(true);
    setDeleteRecipeId(itemId);

    dispatch(deleteDataRecipes(itemId))
      .unwrap()
      .then(() => {
        console.log("Deleted successfully");
        window.location.reload();
        return;
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  return (
    <>
      {currentPageData?.filter(handleVisibilityFilter)?.map((recipe) => (
        <div key={recipe.id} className="w-1240">
          <div className="flex">
            <div>
              {recipe.photos && recipe.photos.length > 0 && (
                <img
                  src={`${baseUrl}/${recipe.photos[0].url}`}
                  className="w-72 h-56 "
                  onError={() => console.log("Image failed to load")}
                />
              )}
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="ml-7">
                  <h5 className="text-xl font-semibold leading-8">
                    {recipe.title}
                  </h5>
                  <p className="mt-1 font-normal text-lg leading-7 text-light-orange">
                    {recipe.categories}
                  </p>
                  <p className="text-gray-color font-normal text-base leading-6 mt-2">
                    Last modified{" "}
                    {new Date(recipe.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour12: false,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex w-8 h-8 ml-650  cursor-pointer">
                <Link to={`/edit/${recipe.id}`}>
                  <div
                    className={`mr-2 p-2 rounded-full ${
                      editHovered === recipe.id
                        ? "bg-light-orange"
                        : "bg-light-pink"
                    }`}
                    onMouseEnter={() => handleEditMouseEnter(recipe.id)}
                    onMouseLeave={handleEditMouseLeave}
                  >
                    <FiEdit
                      className={`text-gray-color ${
                        editHovered === recipe.id ? "text-white" : ""
                      }`}
                    />
                  </div>
                </Link>
                <div
                  className={`mr-2 p-2 rounded-full ${
                    hoveredDeleteButton === recipe.id
                      ? "bg-light-orange"
                      : "bg-light-pink"
                  }`}
                  onMouseEnter={() => setHoveredDeleteButton(recipe.id)}
                  onMouseLeave={() => setHoveredDeleteButton(null)}
                  onClick={() => handleDeleteClick(recipe.id)}
                >
                  <RiDeleteBin4Line
                    className={`text-gray-color ${
                      hoveredDeleteButton === recipe.id ? "text-white" : ""
                    }`}
                  />
                </div>
                {showDeleteModal && deleteRecipeId === recipe.id && (
                  <DeleteRecipe
                    onClose={() => setShowDeleteModal(false)}
                    itemId={deleteRecipeId}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CradRows;
