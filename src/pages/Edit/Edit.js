import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EditRecipes from "../../components/EditRecipes/EditRecipes";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`edit-container ${isDeleteModalOpen ? "blurred" : ""}`}>
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl font-normal">Go back</p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal">Edit Reservation</h1>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="container">
          <div className="w-full flex">
            <div className=" ">
              <EditRecipes id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
