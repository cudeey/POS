import React from "react";
import CreateSupplier from "../../components/CreateSupplier/CreateSupplier";
import NavBar from "../../components/NavBar/NavBar";

const Supplier = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGoBack();
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center bg-light-pink h-89">
        <div className="flex items-center text-center justify-between  w-1240">
          <div
            className="flex"
            onClick={handleGoBack}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
          >
            <img
              src="images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5"
            />
            <p className="text-xl font-medium ">Go back</p>
          </div>
        </div>
      </div>
      <CreateSupplier />
    </div>
  );
};

export default Supplier;
