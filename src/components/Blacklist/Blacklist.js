import { BiBlock } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReservation } from "../../store/slices/getReservation";

const Blacklist = ({ blacklist, onSearch }) => {
  const dispatch = useDispatch();
  const [iconColors, setIconColors] = useState([false, false, false]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  const handleIconClick = (index) => {
    const updatedIconColors = [...iconColors];
    updatedIconColors[index] = !updatedIconColors[index];
    setIconColors(updatedIconColors);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };
  return (
    <div>
      <div className="container">
        <div className="flex justify-between mt-8 lg:flex-row xs:flex-col">
          <p className="text-gray-color text-base lg:text-base leading-6 xs:text-base xs:flex xs:justify-center xs:mb-2">
            List of people on the blacklist
          </p>
          <div className="relative w-466 lg:w-466 flex items-center xs:w-[295px] xs:mt-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-light-gray-two"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block text-black w-full placeholder-light-gray-two p-2 pl-10 text-sm text-900 border border-black rounded-lg"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 mb-14">
          {blacklist.map((reservation) => (
            <div
              key={reservation.id}
              className="flex justify-between border rounded-lg mb-4 px-6 py-4"
            >
              <div className="bg-white  font-medium text-gray-900 lg:whitespace-nowrap whitespace-nowrap w-14 xs:whitespace-normal ">
                {reservation.name}
              </div>
              <div className="text-black-color">{reservation.phone_number}</div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <BiBlock
                    key={`${reservation.id}-${i}`}
                    className={
                      reservation.strikes > i ? "text-red-500" : "text-black"
                    }
                    onClick={() => handleIconClick(i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blacklist;
