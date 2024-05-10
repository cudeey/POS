import { useEffect, useState } from "react";
import CreateIngredientTable from "../../components/CreateIngredientTable/CreateIngredientTable";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import FilterIngredients from "../../components/FilterIngredients/FilterIngredients";
import {
  deleteIngredient,
  getIngredients,
} from "../../store/slices/getIngredients";
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";

const IngredientsTable = () => {
  const [recipeCount, setRecipeCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.apiGetIngredients.data);
  const loading = useSelector((state) => state.apiGetIngredients.loading);
  const error = useSelector((state) => state.apiGetIngredients.error);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = Array.isArray(ingredients)
    ? ingredients.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDeleteIngredient = (ingredientId) => {
    dispatch(deleteIngredient(ingredientId))
      .unwrap()
      .then(() => {
        toast.success("Ingredient Deleted Successfully");
        dispatch(getIngredients()).catch((error) => {
          toast.error(`Refresh failed: ${error.message}`);
        });
      })
      .catch((error) => {
        toast.error(`Delete failed: ${error.message}`);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl xs:text-base font-normal">
              Go back
            </p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal mr-24">Ingredients Table</h1>
          </div>
        </div>
      </div>
      <FilterIngredients recipeCount={recipeCount} />
      <div className="flex justify-center mt-6">
        <CreateIngredientTable
          ingredients={currentIngredients}
          handleDeleteIngredient={handleDeleteIngredient}
        />
      </div>
      <div>
        <Pagination
          activePage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={ingredients.length}
        />
      </div>
    </div>
  );
};

export default IngredientsTable;
