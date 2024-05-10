import React from "react";

const AllMenusCard = ({ title, description, categories, photos }) => {
  const baseUrl = "https://backrecrez.bbros.al";

  return (
    <div>
      <div className="relative mb-7">
        {photos && photos.length > 0 && (
          <img
            src={`${baseUrl}/${photos[0].path || photos[0].filename}`}
            className="w-[384px] h-[280px]"
            alt={`Recipe Image 1`}
          />
        )}
        {!photos ||
          (photos.length === 0 && (
            <img
              src="/images/default-image.jpg"
              className="w-215 h-80"
              alt="Default Image"
            />
          ))}
        <div className="absolute text-white p-7 bottom-0 backdrop-blur-md lg:w-[296px] md:w-[290px] sm:w-[304px] xs:w-[300px]">
          <div className="flex justify-between">
            <h3 className="text-xl lg:text-xl md:text-xl sm:text-base xs:text-base whitespace-nowrap font-semibold">{title}</h3>
          </div>
          <p className="font-semibold text-sm">{description}</p>
          <p className="font-semibold text-sm">{categories}</p>
        </div>
      </div>
    </div>
  );
};

export default AllMenusCard;
