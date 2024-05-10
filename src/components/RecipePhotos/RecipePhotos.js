import React from "react";

const RecipePhotos = () => {
  return (
    <div className="mb-6">
      <div className="mb-4 mt-8">
        <p className="text-base font-medium text-gray-color">All Media</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-456">
        <div>
          <img className="w-full" src="images/Menu-two.svg" alt="Menu" />
        </div>
        <div>
          <img className="w-full" src="images/Menu-three.svg" alt="Menu" />
        </div>
        <div>
          <img className="w-full" src="images/Menu-four.svg" alt="Menu" />
        </div>
        <div>
          <img className="w-full" src="images/Menu-one.svg" alt="Menu" />
        </div>
      </div>
    </div>
  );
};

export default RecipePhotos;
