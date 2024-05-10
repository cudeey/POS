import React, { useRef } from "react";
import Specials from "../Specials/Specials";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialsOfTheDay = () => {
  const menuOfTheDayData = [
    {
      title: "Specials of the day",
      name: "Salmon",
      img: "/images/menu4dropshadow.svg",
    },
    {
      title: "Specials of the day",
      name: "Pasta",
      img: "/images/menu3dropshadow.svg",
    },
    {
      title: "Specials of the day",
      name: "Grilled Chicken",
      img: "/images/menu1dropshadow.svg",
    },
  ];
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="">
        <Slider {...settings} ref={sliderRef}>
          {menuOfTheDayData.map((specials, index) => (
            <div key={index}>
              <Specials
                title={specials.title}
                name={specials.name}
                desc={specials.desc}
                cal={specials.cal}
                img={specials.img}
                sliderRef={sliderRef}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialsOfTheDay;
