import React from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const MenuCard = ({ image, desc, title, price }) => {
  return (
    <div className="group flex justify-center items-center w-350 h-400 rounded-2xl bg-light-pink hover:bg-light-orange transition duration-300">
      <div className="">
        {image && (
          <img src={image} alt="Menu" className="mx-auto w-240  relative" />
        )}

        <div className="group-hover:text-white">
          <div className="flex text-center relative bottom-7 opacity-0 group-hover:opacity-100 transition duration-300 ">
            <Link
              to="/product"
              className="flex items-center justify-center p-1 h-12 w-12 mr-2 bg-dark-orange rounded-full hover:bg-white hover:text-dark-orange"
            >
              <MdOutlineRestaurantMenu className="light-orange w-7 h-7 hover:text-light-orange" />
            </Link>
          </div>

          <div className="mt-4">
            <p className="text-xl text-normal text-black hover:text-white relative bottom-9">
              {title}
            </p>
            <p className="text-lg text-normal text-light-orange mt-1 relative bottom-10">
              {desc}
            </p>
            <p className="text-base text-normal text-gray-color mt-2 relative bottom-12">
              {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
