import { FiArrowRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "../StarRating/StarRating";

const Specials = ({ title, name, desc, cal, img, sliderRef }) => {
  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div>
      <div className="container flex justify-center items-center w-full  md:justify-center xs:justify-center  ">
        <div className="items-center justify-center w-1/2 lg:w-1/2 md:w-1/2 sm:w-full  xs:w-2/4">
          <h1 className=" md:text-40  lg:text-40 sm:text-30 xs:text-lg xs:whitespace-nowrap font-semibold leading-10 text-light-orange mb-4  ">
            {title}
          </h1>
          <h5 className="font-semibold leading-10 text-2xl lg:text-2xl  md:text-xl sm:text-xl xs:text-base mb-2.5">{name}</h5>
          <p className="font-semibold text-lighter-gray text-lg">{desc}</p>
          <p className="font-semibold text-lighter-gray text-lg">{cal}</p>
          <div className="flex xs:text-xs">
            <StarRating />
          </div>
        </div>

        <div className="flex items-center justify-center lg:w-1/2 md:w-38 sm:w-1/2 xs:w-36 ">
          {img && <img src={img} className="xs:ml-8 xs:mt-8" alt="Menu" />}
          <div className="flex ">
            <button
              onClick={handleNextClick}
              className="flex items-center justify-center px-3  lg:h-12 lg:w-12 md:h-12 md:w-12 sm:h-12 sm:w-12    xs:mt-8 xs:h-4 xs:px-1 xs:py-3 mr-3 text-sm font-medium text-gray-500  bg-white border border-gray-300 rounded-full xs:rounded-full hover:bg-gray-100 hover:text-gray-700 "
            >
              <FiArrowRight className="h-6 w-6  xs:w-4  " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specials;
