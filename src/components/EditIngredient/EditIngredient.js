import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editIngredient,
  getIngredientById,
} from "../../store/slices/getIngredients";

const EditIngredient = () => {
  const [ingredients, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredient = useSelector((state) => state.apiGetIngredients.data);

  useEffect(() => {
    dispatch(getIngredientById(parseInt(id))).then((response) => {
      const singleIngredient = response.payload;
      if (singleIngredient) {
        setName(singleIngredient.ingredients);
        setUnit(singleIngredient.unit);
        setCost(singleIngredient.cost);
        setSupplier(singleIngredient.supplier);
        setCategory(singleIngredient.category);
        setDescription(singleIngredient.description);
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [dispatch, id]);
  

  useEffect(() => {
    if (ingredient && ingredient.length > 0) {
      const singleIngredient = ingredient.find(
        (item) => item.id === parseInt(id)
      );

      if (singleIngredient) {
        setName(singleIngredient.ingredients);
        setUnit(singleIngredient.unit);
        setCost(singleIngredient.cost);
        setSupplier(singleIngredient.supplier);
        setCategory(singleIngredient.category);
        setDescription(singleIngredient.description);
      }
    }
  }, [ingredient, id]);

  const handleEditIngredient = async (e) => {
    e.preventDefault();

    const updatedData = {
      ingredients,
      unit,
      cost,
      supplier,
      category,
      description,
    };

    try {
      await dispatch(editIngredient({ id, updatedData }));
      toast.success("Ingredient updated successfully!");
      navigate("/ingredients");
    } catch (error) {
      toast.error(`Edit failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <form onSubmit={handleEditIngredient}>
          <div>
            <label className="block text-sm font-medium">
              Ingredient Name:
            </label>
            <input
              type="text"
              id="ingredients"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] p-2.5"
              placeholder="Enter ingredients ingredients..."
              value={ingredients}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex mt-4 gap-2">
            <div className="flex flex-col">
              <label className="block text-sm font-medium">Unit:</label>
              <input
                type="text"
                id="unit"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40"
                placeholder="Enter unit..."
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                id="cost"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40"
                placeholder="Enter cost..."
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium">Supplier:</label>
              <input
                type="text"
                id="supplier"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40"
                placeholder="Enter supplier..."
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Category:</label>
            <input
              type="text"
              id="category"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] p-2.5"
              placeholder="Enter category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              id="description"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] h-[100px] p-2.5"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex mt-4">
            <button
              type="submit"
              className="block w-74 mr-6 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIngredient;
