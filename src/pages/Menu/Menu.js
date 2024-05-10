import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpecialsOfTheDay from "../../components/SpecialsOfTheDay/SpecialsOfTheDay";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import AllMenus from "../../components/AllMenus/AllMenus";
import Footer from "../../components/Footer/Footer";

const Menu = () => {
  const [selectedCategoryData, setSelectedCategoryData] = useState("Show All");

  return (
    <div className="items-center justify-center h-screen">
      <NavBar />
      <div className="flex justify-center items-center bg-light-pink h-132">
        <h1 className="text-4xl font-bold">Menu</h1>
      </div>
      <SpecialsOfTheDay />
      <MenuCategories setSelectedCategoryData={setSelectedCategoryData} />
      <AllMenus selectedCategoryData={selectedCategoryData} />
      <Footer />
    </div>
  );
};

export default Menu;
