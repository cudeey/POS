import React from "react";

const Categories = ({ description, imageSrc, onClick, selected }) => {
  return (
    <div className="flex mt-14  gap-x-14 lg:w-52 md:w-52 sm:w-52 xs:w-12 ">
      <div
        className={`w-52 h-44 flex items-center justify-center rounded-md px-10 ${
          selected ? "bg-light-orange text-black" : "bg-light-pink"
        } shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 xs:text-sm xs:leading-6 cursor-pointer`}
        onClick={onClick}
      >
        {imageSrc && (
          <img src={imageSrc} alt="Appetizers" className="w-6 h-6 mr-2 xs:w-5" />
        )}
        <p className="text-normal lg:text-lg sm:text-xs xs:text-xs truncate" title={description}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Categories;
