import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import OneProductMenu from "../../components/OneProductMenu/OneProductMenu";

const OneMenu = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="">
      <NavBar />
      <div className="bg-light-pink h-16">
        <div className="flex container" onClick={handleGoBack}>
          <img
            src="images/goback-icon.svg"
            alt="Go back"
            className="mr-2.5 w-7 h-7"
          />
          <p className="text-xl font-medium ">Go back</p>
        </div>
      </div>
      <OneProductMenu />
      <Footer />
    </div>
  );
};

export default OneMenu;
