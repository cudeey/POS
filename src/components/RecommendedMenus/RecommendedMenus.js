import React, { useRef } from "react";
import MenuCard from "../MenuCard/MenuCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendedMenus = () => {
  const menuData = [
    {
      image: "/images/Somamenu.svg",
      title: "Salmon Gravlax",
      desc: "Garde Manger",
      price: "7.90$",
    },
    {
      image: "/images/Somamenu.svg",
      title: "Salmon Gravlax",
      desc: "Garde Manger",
      price: "6.50$",
    },
    {
      image: "/images/Somamenu.svg",
      title: "Salmon Gravlax",
      desc: "Garde Manger",
      price: "5.67$",
    },
    {
      image: "/images/Somamenu.svg",
      title: "Salmon Gravlax",
      desc: "Garde Manger",
      price: "3.45$",
    },
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div>
      <div className="container w-full h-full ">
        <h2 className="text-4xl  font-semibold">Recomandation</h2>
        <p className="text-gray-category font-normal text-xl mt-4 mb-14">
          Case studies from some of our amazing customers who are building
          faster.
        </p>
        <Slider {...settings} ref={sliderRef}>
          {menuData.map((menu, index) => (
            <div key={index}>
              <MenuCard
                image={menu.image}
                desc={menu.desc}
                title={menu.title}
                price={menu.price}
              />
            </div>
          ))}
        </Slider>
        <div className="flex mt-8 mb-20">
          <button
            onClick={handlePrevClick}
            className="flex items-center justify-center px-3 h-12 w-12 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextClick}
            className="flex items-center justify-center px-3 h-12 w-12 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
          >
            <FiArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedMenus;
