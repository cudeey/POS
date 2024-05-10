import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "../Categories/Categories";
import { useDispatch } from "react-redux";
import {
  fetchDataRecipes,
  fetchDataRecipesCategory,
} from "../../store/slices/apiRecipes";

const MenuCategories = ({ selectedCategoryData, setSelectedCategoryData }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Show All");
  const categoriesData = [
    { description: "Appetizers", imageSrc: "/images/appetizers.svg" },
    { description: "Entrees", imageSrc: "/images/entrees.svg" },
    { description: "Pasta   ", imageSrc: "/images/pasta.svg" },
    { description: "Sandwiches", imageSrc: "/images/sandwiches.svg" },
    { description: "Burgers", imageSrc: "/images/burgers.svg" },
    { description: "Pizza", imageSrc: "/images/pizza.svg" },
    { description: "Sea Food", imageSrc: "/images/seafood.svg" },
    { description: "Desserts", imageSrc: "/images/deserts.svg" },
    { description: "Vegetarian", imageSrc: "/images/vegetarian.svg" },
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1
        },
      },
    ],
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleCategorySelect = async (category) => {
    if (selectedCategory === category.description) {
      setSelectedCategory("Show All");
      setSelectedCategoryData([]);
    } else {
      try {
        const response = await dispatch(
          fetchDataRecipesCategory(category.description)
        );
        setSelectedCategory(category.description);
        setSelectedCategoryData(response.payload);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }
  };

  const handleShowAllClick = async () => {
    try {
      const response = await dispatch(fetchDataRecipes());
      setSelectedCategory("Show All");
      setSelectedCategoryData(response.payload);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory === "Show All") {
      handleShowAllClick();
    }
  }, [selectedCategory]);

  return (
    <div>
      <div className="container w-full h-full relative lg:w-full md:w-24 sm:w-12 xs:w-12">
        <h2 className="text-4xl lg:text-4xl md:text-xl sm:text-lg xs:text-lg font-semibold">
          Category
        </h2>
        <p className="text-gray-category font-normal text-xl mt-4 lg:text-lg md:text-lg sm:text-sm xs:text-sm" >
          Case studies from some of our amazing customers who are building
          faster.
        </p>

        <div className="relative w-full">
          <div className="absolute top-0 left-0 z-10">
            <Categories
              description="Show All"
              onClick={handleShowAllClick}
              selected={selectedCategory === "Show All"}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full  md:w-full sm:w-full xs:w-full">
            <div className="slider-container relative">
              <Slider {...settings} ref={sliderRef}>
                {categoriesData.map((category, index) => (
                  <div key={index}>
                    <Categories
                      description={category.description}
                      imageSrc={category.imageSrc}
                      onClick={() => {
                        handleCategorySelect(category);
                      }}
                      selected={selectedCategory === category.description}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full lg:w-full md:w-full sm:w-full mt-8 md:mt-0 xs:mt-0">
            <div className="flex mt-8 mb-20">
              <button
                onClick={handlePrevClick}
                className="flex items-center justify-center lg:px-3 lg:h-12 lg:w-12 xs:px-2 xs:h-8 xs:w-8 mr-3  text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextClick}
                className="flex items-center justify-center lg:px-3 lg:h-12 lg:w-12 mr-3 xs:px-2 xs:h-8 xs:w-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
              >
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCategories;
