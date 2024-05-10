import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropdownIngredientsCreate = ({
  ingredients,
  selectedOption,
  onSelect,
  toggleDropdown,
}) => {
  const dropdownRef = useRef(null);

  const handleOptionClick = (ingredient) => {
    onSelect(ingredient.id);
    setSelectedIngredientName(ingredient.ingredients);
    toggleDropdown();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIngredientName, setSelectedIngredientName] =
    useState("Select");

  const handleSelectClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleArrowsClick = (event) => {
    event.stopPropagation();
    handleSelectClick();
  };

  const handleOptionKeyDown = (event, ingredient) => {
    if (event.key === "Enter") {
      handleOptionClick(ingredient);
    }
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleOptionClickWrapper = (ingredient) => {
    handleOptionClick(ingredient);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="block w-40 h-12 relative rounded-lg border-0 px-2.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onClick={handleSelectClick}
        tabIndex={0}
        role="button"
      >
        <p
          className="flex justify-between cursor-pointer"
          onClick={handleSelectClick}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSelectClick();
            }
          }}
          tabIndex={0}
          role="button"
        >
          {selectedIngredientName}
          {isDropdownOpen ? (
            <RiArrowDropDownLine
              className="h-6 w-6"
              onClick={handleArrowsClick}
            />
          ) : (
            <RiArrowDropUpLine
              className="h-6 w-6"
              onClick={handleArrowsClick}
            />
          )}
        </p>

        {isDropdownOpen && (
          <div className="absolute items-center top-14 left-0 bg-white text-black border rounded-md p-2 w-full justify-center z-10">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex justify-center text-black hover:bg-light-orange hover:rounded-md hover:text-black hover:w-full text-center text-xs w-full py-2 cursor-pointer"
                onClick={() => {
                  handleOptionClickWrapper(ingredient);
                }}
                onKeyDown={(event) => handleOptionKeyDown(event, ingredient)}
                tabIndex={0}
                role="button"
              >
                {ingredient.ingredients}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownIngredientsCreate;
