import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataRecipes,
  fetchDataRecipes,
} from "../../store/slices/apiRecipes";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";

const CardColumns = ({ page, onRecipeCountChange }) => {
  const [editHovered, setEditHovered] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hoveredDeleteButton, setHoveredDeleteButton] = useState(null);
  const [deleteRecipeId, setDeleteRecipeId] = useState(null);
  const dataRecipes = useSelector((state) => state.apiRecipes.data?.recipes);
  const filterValue = useSelector((state) => state.filter.filteredRecipe);
  const dispatch = useDispatch();
  const baseUrl = "https://backrecrez.bbros.al";

  const recipesPerPage = 4;
  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = Math.min(
    startIndex + recipesPerPage,
    dataRecipes?.length || 0
  );

  const filteredRecipes = (dataRecipes || []).filter((item) => {
    if (filterValue === "") {
      return true;
    } else {
      return item?.visibility === parseInt(filterValue, 10);
    }
  });
  
  console.log("filteredRecipes", filteredRecipes);

  const currentPageData = filteredRecipes?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    dispatch(fetchDataRecipes()).then((response) => {
      const recipeCount = response.payload?.recipes?.length || 0;
      onRecipeCountChange(recipeCount);
    });
  }, [dispatch, onRecipeCountChange]);

  const handleEditMouseEnter = (itemId) => {
    setEditHovered(itemId);
  };

  const handleEditMouseLeave = () => {
    setEditHovered(null);
  };

  const handleDeleteClick = (itemId) => {
    const updatedDataRecipes = dataRecipes?.filter(
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

  console.log(currentPageData);

  return (
    <>
      {currentPageData?.map((recipe) => {
        const videoArray = Array.isArray(recipe?.video) ? recipe?.video : [];

        const filteredPhotos = videoArray.filter((photo) =>
          /\.(png|jpg|jpeg)$/i.test(photo.filename)
        );

        const img = `${baseUrl}/${
          filteredPhotos?.length !== 0
            ? filteredPhotos[0].path.replaceAll(" ", "%20")
            : ""
        }`;

        return (
          <div key={recipe.id} className="pb-10 pt-3">
            <Link to={`/details/${recipe.id}`}>
              <div>
                <img
                  src={img}
                  className="w-[286px] h-56"
                  alt={`Recipe Photo 0`}
                  onError={() => console.log("Image failed to load")}
                />
              </div>
            </Link>
            <div>
              <div className="flex w-286 justify-between mt-5">
                <h5 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                  {recipe.title}
                </h5>
                <div className="flex cursor-pointer">
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
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDeleteRecipeId(recipe.id);
                    }}
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
              <p className="mt-1 font-normal text-lg leading-7 text-light-orange">
                {recipe.categories}
              </p>

              <p className="text-gray-color font-normal text-base leading-6 mt-2 ">
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
        );
      })}
    </>
  );
};

export default CardColumns;
