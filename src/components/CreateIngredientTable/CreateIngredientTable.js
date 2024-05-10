import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { getIngredients} from "../../store/slices/getIngredients";
import { Link, useNavigate } from "react-router-dom";

const CreateIngredientTable = ({ ingredients, handleDeleteIngredient }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleShowDeleteModal = (ingredientId) => {
    setShowDeleteModal(true);
    setSelectedIngredientId(ingredientId);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedIngredientId(null);
  };

  const handleDelete = () => {
    handleDeleteIngredient(selectedIngredientId);
    handleHideDeleteModal();
  };

  const handleEdit = (ingredient) => {
    if (ingredient.type === "ingredient") {
      navigate(`/edit-ingredient/${ingredient.id}`);
    } else if (ingredient.type === "subingredient") {
      navigate(`/edit-subingredient/${ingredient.id}`);
    }
  };

  return (
    <div className="container flex justify-center">
      <div className="container">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-6">
            <div class="inline-block min-w-full py-1  sm:px-6 lg:px-8  ">
              <div class="overflow-hidden ">
                <table class="min-w-full border text-center text-sm  ">
                  <thead class="border-b  text-light-orange bg-white-light">
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px] "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px]"
                      >
                        Ingredient
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px]"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px] "
                      >
                        Unit
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px]"
                      >
                        Cost
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px] "
                      >
                        Supplier
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-3 font-normal w-[150px]"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient) => (
                      <tr key={ingredient.id} class="border-b font-light">
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.id}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.ingredients}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.category}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.unit}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.cost}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3">
                          {ingredient.supplier}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-3 text-gray-400 ">
                          <button className="mr-2" 
                          onClick={() => handleEdit(ingredient)}>
                              <FiEdit2
                                size="16px "
                                className="cursor-pointer"
                              />
                          </button>
                          <button
                            onClick={() => handleShowDeleteModal(ingredient.id)}
                          >
                            <RiDeleteBin6Line
                              size="16px"
                              className="cursor-pointer"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this ingredient?
            </p>
            <div className="flex justify-center">
              <button
                className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 mr-2"
                onClick={handleHideDeleteModal}
              >
                No, cancel
              </button>
              <button
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateIngredientTable;
