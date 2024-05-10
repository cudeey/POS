import React from "react";
import CreateRecipe from "../../components/CreateRecipe/CreateRecipe";
import NavBar from "../../components/NavBar/NavBar";
import ActionsBar1 from "../../components/ActionsBar1/ActionsBar1";

const Create = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="edit-container">
      <NavBar />
      <div className="flex justify-center bg-light-pink h-89">
        <div className="flex items-center text-center justify-between w-1240">
          <div className="flex" onClick={handleGoBack}>
            <img
              src="images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5"
            />
            <p className="text-xl font-medium ">Go back</p>
          </div>
          <h1 className="text-xl font-medium">Create Recipe</h1>
          <ActionsBar1 />
        </div>
      </div>
      <div className="flex  ">
        <div className="container">
          <div className="w-full flex">
            <div className=" ">
              <CreateRecipe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
