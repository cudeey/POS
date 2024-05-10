import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import { AiFillLock } from "react-icons/ai";
import {
  createDataRecipes,
  fetchDataRecipes,
} from "../../store/slices/apiRecipes";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getIngredients } from "../../store/slices/getIngredients";
import { getSupplier } from "../../store/slices/getSupplier";
import DropdownIngredientsCreate from "../DropdownIngredientsCreate/DropdownIngredientsCreate";
import DropdownSupplierCreate from "../DropdownSupplierCreate/DropdownSupplierCreate";
import DropdownRecipe from "../DropdownRecipe/DropdownRecipe";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState("");
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();
  const [visibilityOption, setVisibilityOption] = useState(1);

  const [recipeIngredients, setRecipeIngredients] = useState([
    { quantity: "", unit: "", ingredients: "", cost: "", companyName: "" },
  ]);
  const [categoryDropdown, setCategoryDropdown] = useState([
    { isOpen: true, value: selectedCategory },
  ]);

  const [ingredientsDropdown, setIngredientsDropdown] = useState(
    recipeIngredients.map(() => ({ isOpen: false, selectedOption: "" }))
  );

  const [selectedIngredientsForRow, setSelectedIngredientsForRow] = useState(
    recipeIngredients.map(() => "")
  );

  const [suppliersDropdown, setSuppliersDropdown] = useState(
    recipeIngredients.map(() => ({ isOpen: false, selectedOption: "" }))
  );

  const [selectedSuppliersForRow, setSelectedSuppliersForRow] = useState(
    recipeIngredients.map(() => "")
  );

  const ingredients = useSelector((state) => state.apiGetIngredients.data);
  const companyName = useSelector((state) => state.apiGetSuppliers.data);

  useEffect(() => {
    dispatch(fetchDataRecipes());
    dispatch(getIngredients());
    dispatch(getSupplier());
  }, []);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setMedia([...media, ...Array.from(files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", selectedCategory);
    formData.append("visibility", visibilityOption);
    // formData.append("recipe_activity", 0);
    formData.append("created_by", localStorage.getItem("userId"));

    media.forEach((item) => formData.append("videos", item));

    const ingredientsData = recipeIngredients.map((ingredient) => ({
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      ingredients: ingredient.ingredients,
      cost: ingredient.cost,
      companyName: ingredient.companyName,
    }));

    formData.append("quantities", JSON.stringify(ingredientsData));
    console.log("FormData content:");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      await dispatch(createDataRecipes(formData));
      setTitle("");
      setDescription("");
      setRecipeIngredients([
        { quantity: "", unit: "", ingredients: "", cost: "", companyName: "" },
      ]);
      setMedia([]);
      navigate("/home");
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  const handleCategory = (index, option) => {
    setSelectedCategory(option);
    setCategoryDropdown((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const handleIngredients = (index, option) => {
    setSelectedIngredients(option);

    const updatedSelectedIngredients = [...selectedIngredientsForRow];
    updatedSelectedIngredients[index] = option;
    setSelectedIngredientsForRow(updatedSelectedIngredients);

    const updatedDropdowns = [...ingredientsDropdown];
    updatedDropdowns[index] = { ...updatedDropdowns[index], isOpen: false };
    setIngredientsDropdown(updatedDropdowns);

    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      ingredients: option,
    };
    setRecipeIngredients(updatedIngredients);
  };

  const handleSuppliers = (index, option) => {
    setSelectedSuppliers(option);
    const updatedSelectedSuppliers = [...selectedSuppliersForRow];
    updatedSelectedSuppliers[index] = option;
    setSelectedSuppliersForRow(updatedSelectedSuppliers);

    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      companyName: option,
    };
    setRecipeIngredients(updatedIngredients);

    const updatedDropdowns = [...suppliersDropdown];
    updatedDropdowns[index] = { ...updatedDropdowns[index], isOpen: false };
    setSuppliersDropdown(updatedDropdowns);
  };

  const handleAddField = () => {
    setRecipeIngredients([
      ...recipeIngredients,
      { quantity: "", unit: "", ingredients: "", cost: "", companyName: "" },
    ]);

    setIngredientsDropdown((prevDropdowns) => [
      ...prevDropdowns,
      { isOpen: true, value: selectedIngredients },
    ]);

    setSuppliersDropdown((prevDropdowns) => [
      ...prevDropdowns,
      { isOpen: true, value: selectedSuppliers },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients.splice(index, 1);
    setRecipeIngredients(updatedIngredients);
  };

  const categories = [
    "Appetizers",
    "Entrees",
    "Pasta",
    "Sandwiches",
    "Burgers",
    "Pizza",
    "Sea Food",
    "Desserts",
    "Vegetarian",
  ];

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="items-center justify-center flex mt-20">
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              id="name"
              placeholder="Type Menu or Event Name"
              className="mb-8 block w-[570px] h-46 rounded-md border-0 px-3.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="">
              {categoryDropdown.map((dropdown, index) => (
                <DropdownRecipe
                  key={index}
                  options={categories}
                  selectedOption={dropdown.value}
                  isOpen={dropdown?.isOpen || false}
                  onSelect={(option) => handleCategory(index, option)}
                  toggleDropdown={() =>
                    setCategoryDropdown((prevDropdowns) =>
                      prevDropdowns.map((d, i) =>
                        i === index ? { ...d, isOpen: !d.isOpen } : d
                      )
                    )
                  }
                />
              ))}
            </div>
            <div>
              <div className="grid grid-rows-1 gap-x-2 sm:grid-rows-1">
                {recipeIngredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-x-2 mt-5">
                    <label className="text-sm font-medium leading-5">
                      <div className="flex mb-2 gap-x-2 text-sm font-medium leading-5">
                        <p className="">Ingredient</p>
                        <Link
                          to="/ingredient"
                          class="text-white bg-yellow-500 text-xs rounded-lg px-2.5 py-1  "
                        >
                          Add
                        </Link>
                      </div>
                      <DropdownIngredientsCreate
                        ingredients={ingredients}
                        selectedOption={selectedIngredientsForRow[index]}
                        isOpen={ingredientsDropdown[index].isOpen || false}
                        onSelect={(option) => handleIngredients(index, option)}
                        toggleDropdown={() =>
                          setIngredientsDropdown((prevDropdowns) =>
                            prevDropdowns.map((d, i) =>
                              i === index ? { ...d, isOpen: !d.isOpen } : d
                            )
                          )
                        }
                      />
                    </label>

                    <label className="text-sm font-medium leading-5">
                      Qty
                      <input
                        name={`qty-${index}`}
                        placeholder="Qty"
                        className="mt-3 block w-[60px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={ingredient.quantity}
                        onChange={(e) => {
                          const updatedIngredients = [...recipeIngredients];
                          updatedIngredients[index].quantity = e.target.value;
                          setRecipeIngredients(updatedIngredients);
                        }}
                      />
                    </label>

                    <label className="text-sm font-medium leading-5">
                      Unit
                      <input
                        name={`unit-${index}`}
                        placeholder="Unit"
                        className="mt-3 block w-[70px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={ingredient.unit}
                        onChange={(e) => {
                          const updatedIngredients = [...recipeIngredients];
                          updatedIngredients[index].unit = e.target.value;
                          setRecipeIngredients(updatedIngredients);
                        }}
                      />
                    </label>

                    <label className="text-sm font-medium leading-5">
                      <p className=""> Cost</p>

                      <input
                        name={`cost-${index}`}
                        placeholder="Cost"
                        className="mt-3 block w-[90px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={ingredient.cost}
                        onChange={(e) => {
                          const updatedIngredients = [...recipeIngredients];
                          updatedIngredients[index].cost = e.target.value;
                          setRecipeIngredients(updatedIngredients);
                        }}
                      />
                    </label>

                    <label className="text-sm font-medium leading-5">
                      <div className="flex mb-2 gap-x-2 text-sm font-medium leading-5">
                        <p>Supplier</p>
                        <Link
                          to="/supplier"
                          class="text-white bg-yellow-500 text-xs rounded-lg px-2.5 py-1  "
                        >
                          Add
                        </Link>
                      </div>
                      <DropdownSupplierCreate
                        companyName={companyName}
                        selectedOption={selectedSuppliersForRow[index]}
                        isOpen={suppliersDropdown[index].isOpen || false}
                        onSelect={(option) => handleSuppliers(index, option)}
                        toggleDropdown={() =>
                          setSuppliersDropdown((prevDropdowns) =>
                            prevDropdowns.map((d, i) =>
                              i === index ? { ...d, isOpen: !d.isOpen } : d
                            )
                          )
                        }
                      />
                    </label>

                    <div className="flex items-end gap-2">
                      {index === recipeIngredients.length - 1 && (
                        <button
                          type="button"
                          className="ml-2 p-3 bg-light-pink rounded-full w-12 h-12"
                          onClick={handleAddField}
                        >
                          <img
                            src="images/add-icon.svg"
                            alt="Add"
                            className="w-6 h-6"
                          />
                        </button>
                      )}
                      <button
                        type="button"
                        className="p-3 bg-light-pink rounded-full w-12 h-12"
                        onClick={() => handleRemoveField(index)}
                      >
                        <img
                          src="images/delete-icon.svg"
                          alt="Delete"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full">
              <div className="sm:col-span-2 mt-4 w-full">
                <label className="text-sm font-medium leading-5">
                  Preparation Recipe
                </label>
                <div className="mt-1 w-[570px] ">
                  <ReactQuill
                    value={description}
                    onChange={handleQuillChange}
                    theme="snow"
                  />
                </div>
              </div>
              <div>
                <AiFillLock className="ml-4 mt-12 p-3 bg-light-pink rounded-full w-12 h-12" />
              </div>
            </div>
            <div className="flex my-8 gap-x-5 ">
              <div className="">
                <button
                  type="submit"
                  className="block w-74 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Add
                </button>
              </div>

              <div class="flex items-center ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value="aktive"
                  onClick={() => setVisibilityOption(1)}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Aktive
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value="pasive"
                  onClick={() => setVisibilityOption(0)}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="checked-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Pasive
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-24 ml-[200px]">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-456 image-container">
          {media?.map((file, index) => (
            <div className="relative group" key={index}>
              {file.type.startsWith("image/") ? (
                <img
                  className="w-[200px] h-[200px] object-cover	"
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded Image ${index}`}
                />
              ) : (
                <video
                  className="w-[200px] h-[200px] object-cover	"
                  src={URL.createObjectURL(file)}
                  controls
                />
              )}
              <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-dark-gray bg-opacity-90 text-white p-3 flex justify-between items-center">
                  <h5 className="font-medium text-xs leading-5">
                    {file.type.startsWith("image/")
                      ? `Photo ${index + 1}`
                      : `Video ${index + 1}`}
                  </h5>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      const newFiles = [...media];
                      newFiles.splice(index, 1);
                      setMedia(newFiles);
                    }}
                  >
                    <img src="images/delete-icon-white.svg" alt="Delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="relative h-[200px]">
            <label
              htmlFor="file-upload"
              className="cursor-pointer plus-icon-label"
            >
              <img className="w-full" src="images/Menu-one.svg" alt="Menu" />
              <div className="absolute text-white justify-center items-center flex bottom-0 backdrop-blur-md w-full h-full">
                <h5 className="font-semibold leading-10 text-6xl justify-center mb-20">
                  +
                </h5>
              </div>
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".png, .svg, .jpg, .jpeg"
              style={{ display: "none" }}
              multiple
              onChange={handleFileUpload}
            />

            <input
              type="file"
              id="video-upload"
              name="video-upload"
              accept="video/*, .png, .svg, .jpg, .jpeg"
              style={{ display: "none" }}
              multiple
              onChange={handleFileUpload}
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <div className="absolute text-white justify-center items-center flex bottom-0 backdrop-blur-md w-full h-full">
                <h5 className="font-semibold leading-10 text-6xl justify-center mb-20">
                  +
                </h5>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
