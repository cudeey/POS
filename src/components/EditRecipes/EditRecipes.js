import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteDataPhoto,
  deleteDataQuantity,
  updateDataRecipes,
} from "../../store/slices/apiRecipes";
import Dropdown from "../Dropdown/Dropdown";
import { AiFillLock, AiOutlineDelete } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DropdownIngredients from "../DropdownIngredients/DropdownIngredients";
import DropdownSupplier from "../DropdownSupplier/DropdownSupplier";
import { getSupplier } from "../../store/slices/getSupplier";
import { getIngredients } from "../../store/slices/getIngredients";
import { setFilteredRecipe } from "../../store/slices/filterSlice";
import DropdownRecipe from "../DropdownRecipe/DropdownRecipe";

const EditRecipes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataRecipes = useSelector((state) => state.apiRecipes.data.recipes);
  const [changeTitle, setChangeTitle] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  const [changeCategory, setChangeCategory] = useState("");
  const [changeIngredients, setChangeIngredients] = useState("");
  const [changeSuppliers, setChangeSuppliers] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [photos, setPhotos] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [visibilityOption, setVisibilityOption] = useState("1");

  const [categoryDropdown, setCategoryDropdown] = useState([
    { isOpen: true, value: changeCategory },
  ]);
  const [recipeIngredients, setRecipeIngredients] = useState([
    {
      id: null,
      quantity: "",
      unit: "",
      ingredients: "",
      cost: "",
      companyName: "",
    },
  ]);
  const navigate = useNavigate();
  const [ingredientsDropdown, setIngredientsDropdown] = useState(
    recipeIngredients.map(() => ({ isOpen: false, selectedOption: "" }))
  );

  if (recipeIngredients.length === 0) {
    setIngredientsDropdown([]);
  }

  const [selectedIngredientsForRow, setSelectedIngredientsForRow] = useState(
    recipeIngredients.map((ingredient) => ingredient.ingredients || "")
  );

  const [suppliersDropdown, setSuppliersDropdown] = useState(
    recipeIngredients.map(() => ({ isOpen: false, selectedOption: "" }))
  );

  const [selectedSuppliersForRow, setSelectedSuppliersForRow] = useState(
    recipeIngredients.map((ingredient) => ingredient.companyName || "")
  );

  const ingredients = useSelector((state) => state.apiGetIngredients.data);
  const companyName = useSelector((state) => state.apiGetSuppliers.data);

  const baseUrl = "https://backrecrez.bbros.al";

  useEffect(() => {
    const itemToEdit = dataRecipes.find((item) => item.id.toString() === id);
    setItemToEdit(itemToEdit);

    dispatch(getIngredients());
    dispatch(getSupplier());

    if (itemToEdit) {
      console.log(dataRecipes, itemToEdit, "dataRecipes");
      setChangeTitle(itemToEdit.title || "");
      setChangeDescription(itemToEdit.description || "");
      setChangeCategory(itemToEdit.categories || "");
      setSelectedCategory(itemToEdit.categories || "");
      setChangeIngredients(itemToEdit.ingredients || "");
      setSelectedIngredient(itemToEdit.ingredients || "");
      setChangeSuppliers(itemToEdit.companyName || "");
      setSelectedSupplier(itemToEdit.companyName || "");
      setVisibilityOption(itemToEdit.visibility || "0");

      const initialIngredients = itemToEdit.quantities || [];

      console.log(initialIngredients, "initialIngredients");
      let tempArray = [];

      itemToEdit?.quantities?.forEach((element) => {
        let elementIngredient = ingredients?.find((e) => {
          return e?.ingredients === element?.ingredient_name;
        });
        let elementCompanyName = companyName?.find((e) => {
          return e?.companyName === element?.companyName;
        });
        console.log(elementIngredient, "asd", elementCompanyName);
        tempArray?.push({
          ...element,
          ingredients: elementIngredient,
          companyName: elementCompanyName,
        });
        console.log(element, elementCompanyName, ingredients, companyName);
      });
      console.log(tempArray, "temparray");
      setRecipeIngredients(tempArray);

      const initialMediaFiles = itemToEdit.video || [];
      setMediaFiles(initialMediaFiles);

      setIngredientsDropdown(new Array(initialIngredients.length).fill(false));
      setSuppliersDropdown(new Array(initialIngredients.length).fill(false));

      const isRecipeActive =
        itemToEdit && itemToEdit.isActive !== undefined
          ? itemToEdit.isActive
          : true;
      console.log("isRecipeActive:", isRecipeActive);
      dispatch(setFilteredRecipe(isRecipeActive ? "1" : "0"));
    }
  }, []);

  const handleEditItem = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", changeTitle);
      formData.append("description", changeDescription);
      formData.append("categories", changeCategory);
      formData.append("visibility", visibilityOption);

      formData.append("recipeId", id);

      const ingredientsData = recipeIngredients.map((ingredient, index) => ({
        id:
          ingredient.id ||
          (itemToEdit.quantities[index] && itemToEdit.quantities[index].id),
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredients: ingredient.ingredients?.id,
        cost: ingredient.cost,
        companyName: ingredient.companyName?.id,
      }));

      formData.append("quantities", JSON.stringify(ingredientsData));

      const newMediaFiles = Array.from(
        document.getElementById("file-upload").files
      );
      newMediaFiles.forEach((mediaFile, index) => {
        formData.append("videos", mediaFile);
      });

      const response = await dispatch(
        updateDataRecipes({ id: id, updatedData: formData })
      );

      console.log("Response:", response);
      toast.success("Changes saved successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save changes: " + error);
    }
  };

  const handleAddField = () => {
    const newIngredient = {
      id: null,
      quantity: "",
      unit: "",
      ingredients: "",
      cost: "",
      companyName: "",
    };
    setIngredientsDropdown((prevDropdowns) => [
      ...prevDropdowns,
      { isOpen: false },
    ]);
    setSuppliersDropdown((prevDropdowns) => [
      ...prevDropdowns,
      { isOpen: false },
    ]);
    setRecipeIngredients([...recipeIngredients, newIngredient]);
  };

  const handleRemoveField = (index) => {
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients.splice(index, 1);
    setRecipeIngredients(updatedIngredients);
  };

  const handleCategory = (index, option) => {
    setSelectedCategory(option);
    setChangeCategory(option);
    setCategoryDropdown((prevDropdowns) =>
      prevDropdowns.map((dropdown, i) =>
        i === index ? { ...dropdown, value: option, isOpen: false } : dropdown
      )
    );
  };

  const handleIngredients = (index, option) => {
    setSelectedIngredient(option);

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
    setSelectedSupplier(option);

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

  const handleDeletePhoto = (photoId, index) => {
    dispatch(deleteDataPhoto({ itemId: photoId, index }))
      .unwrap()
      .then(() => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
      })
      .catch((error) => {
        toast.error("Failed to delete photo: " + error.message);
      });
  };

  const handleDeleteQuantity = (quantityId, index) => {
    dispatch(deleteDataQuantity(quantityId))
      .unwrap()
      .then(() => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients.splice(index, 1);
        setRecipeIngredients(updatedIngredients);
      })
      .catch((error) => {
        toast.error("Failed to delete quantity: " + error);
      });
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

  return (
    <div className="flex justify-center mt-20">
      <div className="items-center justify-center flex mt-20">
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <form onSubmit={handleEditItem} className="flex">
            <div>
              <input
                name="title"
                id="title"
                placeholder="Type Menu or Event Name"
                className="mb-8 block w-[570px] h-46 rounded-md border-0 px-3.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={changeTitle || ""}
                onChange={(e) => setChangeTitle(e.target.value)}
              />
              <div>
                {categoryDropdown.map((dropdown, index) => (
                  <>
                    <DropdownRecipe
                      key={index}
                      options={categories}
                      selectedOption={selectedCategory}
                      isOpen={dropdown?.isOpen || false}
                      onSelect={(option) => handleCategory(index, option)}
                      toggleDropdown={() =>
                        setCategoryDropdown((prevDropdowns) =>
                          prevDropdowns.map((d, i) =>
                            i === index ? { ...d, isOpen: !d?.isOpen } : d
                          )
                        )
                      }
                    />
                  </>
                ))}
              </div>

              <div>
                <div className="grid grid-rows-1 gap-x-2 sm:grid-rows-1">
                  {recipeIngredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-x-2 mt-5">
                      <label className="text-sm font-medium leading-5">
                        <p className="mb-2">Ingredient</p>
                        <DropdownIngredients
                          ingredients={ingredients}
                          selectedOption={ingredient?.ingredients}
                          isOpen={ingredientsDropdown[index]?.isOpen || false}
                          onSelect={(option) =>
                            handleIngredients(index, option)
                          }
                          toggleDropdown={() =>
                            setIngredientsDropdown((prevDropdowns) =>
                              prevDropdowns.map((d, i) =>
                                i === index ? { ...d, isOpen: !d?.isOpen } : d
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
                          className="mt-2 block w-[60px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={ingredient.quantity}
                          onChange={(e) => {
                            const updatedIngredients = [...recipeIngredients];
                            updatedIngredients[index] = {
                              ...updatedIngredients[index],
                              quantity: e.target.value,
                            };
                            setRecipeIngredients(updatedIngredients);
                          }}
                        />
                      </label>

                      <label className="text-sm font-medium leading-5">
                        Unit
                        <input
                          name={`unit-${index}`}
                          placeholder="Unit"
                          className="mt-2 block w-[70px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={ingredient.unit}
                          onChange={(e) => {
                            const updatedIngredients = [...recipeIngredients];
                            updatedIngredients[index] = {
                              ...updatedIngredients[index],
                              unit: e.target.value,
                            };
                            setRecipeIngredients(updatedIngredients);
                          }}
                        />
                      </label>
                      <label className="text-sm font-medium leading-5">
                        Cost
                        <input
                          name={`cost-${index}`}
                          placeholder="Cost"
                          className="mt-2 block w-[90px] h-12 rounded-md border-0 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={ingredient.cost}
                          onChange={(e) => {
                            const updatedIngredients = [...recipeIngredients];
                            updatedIngredients[index] = {
                              ...updatedIngredients[index],
                              cost: e.target.value,
                            };
                            setRecipeIngredients(updatedIngredients);
                          }}
                        />
                      </label>

                      <label className="text-sm font-medium leading-5">
                        <p className="mb-2"> Supplier</p>
                        <DropdownSupplier
                          companyName={companyName}
                          selectedOption={ingredient?.companyName}
                          isOpen={suppliersDropdown[index]?.isOpen || false}
                          onSelect={(option) => handleSuppliers(index, option)}
                          toggleDropdown={() =>
                            setSuppliersDropdown((prevDropdowns) =>
                              prevDropdowns.map((d, i) =>
                                i === index ? { ...d, isOpen: !d?.isOpen } : d
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
                            <MdOutlineAdd className="w-6 h-6 text-gray-color" />
                          </button>
                        )}

                        <button
                          type="button"
                          className="p-3 bg-light-pink rounded-full w-12 h-12"
                          onClick={() =>
                            handleDeleteQuantity(ingredient.id, index)
                          }
                        >
                          <FiTrash className="w-5 h-5 text-gray-color" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex">
                <div className="sm:col-span-2 mt-4 w-full">
                  <label className="text-sm font-medium leading-5">
                    Preparation Recipe
                  </label>
                  <div className="mt-1 w-[570px]">
                    <ReactQuill
                      value={changeDescription}
                      onChange={(value) => setChangeDescription(value)}
                    />
                  </div>
                </div>
                <div>
                  <AiFillLock className="mr-[57px] mt-12 p-3 bg-light-pink rounded-full w-12 h-12" />
                </div>
              </div>
              <div className="flex my-8 gap-x-5">
                <div>
                  <button
                    type="submit"
                    className="block w-74 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Save
                  </button>
                </div>
                <div class="flex items-center ">
                  <input
                    id="active-checkbox"
                    type="checkbox"
                    value="active"
                    onClick={() => setVisibilityOption(1)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="active-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Aktive
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="passive-checkbox"
                    type="checkbox"
                    value="passive"
                    onClick={() => setVisibilityOption(0)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="passive-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Pasive
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-20 ml-24">
              <p className="text-base font-medium text-gray-color">All Media</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-456 mt-5 image-container">
                {itemToEdit && Array.isArray(itemToEdit.video)
                  ? itemToEdit.video.map((mediaObj, index) => (
                      <div className="relative group" key={index}>
                        {/\.(png|jpg|jpeg)$/i.test(mediaObj.filename) ? (
                          <img
                            src={`${baseUrl}/${mediaObj.path}`}
                            alt={`Uploaded Image ${index}`}
                            className="w-full"
                          />
                        ) : (
                          <video
                            key={index}
                            controls
                            width="100%"
                            height="100%"
                            src={`${baseUrl}/${mediaObj.path}`}
                            alt={`Uploaded Video ${index}`}
                          />
                        )}
                        <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-dark-gray bg-opacity-90 text-white p-3 flex justify-between items-center">
                            <h5 className="font-medium text-xs leading-5">
                              {/\.(png|jpg|jpeg)$/i.test(mediaObj.filename)
                                ? `Photo ${index + 1}`
                                : `Video ${index + 1}`}
                            </h5>
                            <AiOutlineDelete
                              onClick={() =>
                                handleDeletePhoto(itemToEdit?.id, index)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : null}

                <div className="relative h-[200px]">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <img
                      className="w-full"
                      src="/images/Menu-one.svg"
                      alt="Menu"
                    />
                    <div className="absolute text-white justify-center items-center flex bottom-0 backdrop-blur-md w-full h-full">
                      <h5 className="font-semibold leading-10 text-6xl">+</h5>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept="video/*, .png, .svg, .jpg, .jpeg"
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipes;
