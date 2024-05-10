import StarRating from "../StarRating/StarRating";
import { FiArrowRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialsFood = ({ title, name, desc, cal, img, sliderRef }) => {
  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div>
      <div className="container flex justify-center items-center w-full">
        <div className="items-center justify-center w-1/2">
          <h1 className="text-40 font-semibold leading-10 text-light-orange mb-4 ">
            {title}
          </h1>
          <h5 className="font-semibold leading-10 text-2xl mb-2.5">{name}</h5>
          <p className="font-semibold text-lighter-gray text-lg">{desc}</p>
          <p className="font-semibold text-lighter-gray text-lg">{cal}</p>
          <div className="flex">
            <StarRating />
          </div>
        </div>
        <div className="flex items-center justify-end w-1/2 mt-24">
          {img && <img src={img} alt="Menu" />}
          <div className="flex">
            <button
              onClick={handleNextClick}
              className="flex items-center justify-center px-3 h-12 w-12 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 "
            >
              <FiArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialsFood;
