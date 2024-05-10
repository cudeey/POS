import React from "react";

const DeleteRecipe = ({ onClose, itemId, handleDeleteClick }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div className="rounded-3xl bg-light-pink w-939 h-310 z-[999]">
        <div className="ml-16 mt-16">
          <h2 className="text-4xl font-semibold mb-5 text-center	">
            Do you want to delete the recipe?
          </h2>
          <p className="text-xl text-black-color mb-10 text-center	">
            Deleting a recipe will remove it from all related menus & events and
            courses.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-lighter-pink hover-bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16 mr-3"
              onClick={() => {
                handleDeleteClick(itemId);
                onClose();
              }}
            >
              Yes
            </button>
            <button
              className="bg-lighter-pink hover-bg-light-orange border border-black text-black font-bold py-2 px-4 rounded w-16"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecipe;