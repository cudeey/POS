import { MdOutlineRestaurantMenu } from "react-icons/md";
import StarRating from "../StarRating/StarRating";

const OneProductMenu = () => {
  return (
    <div>
      <div className="container w-full h-full">
        <div className="flex py-20">
          <img src="images/one-menu.svg" alt="Menu" />
          <div className="flex justify-center items-center ml-20">
            <div>
              <h3 className="text-4xl leading-9 font-semibold text-light-orange">
                HEART & SOUL
              </h3>
              <p className="text-2xl leading-10 font-semibold mt-2.5">
                740 Cal.
              </p>
              <p className="text-xl leading-8 font-normal text-gray-category w-491 mt-2.5">
                Tuna-mix me karrotë dhe tranguj turshi, misër, fasule të zezë,
                oriz, pasta integrale me shije të rrepës së kuqe dhe kikirikut;
                qepë të kuqe turshi, speca, fara susami dhe salcë: “Spicy
                Tomato” & “Sharp Vinaigrette”.
              </p>
              <div className="flex mt-5">
                <StarRating />
              </div>
              <div className="text-center mt-10">
                <button className="flex items-center justify-center p-1 h-12 w-12 bg-dark-orange rounded-full hover:bg-white-color hover:text-dark-orange">
                  <MdOutlineRestaurantMenu className="text-white w-7 h-7 hover:text-light-orange" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProductMenu;
