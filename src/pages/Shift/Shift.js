import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import NewShift from "../../components/NewShift/NewShift";
import Pagination from "../../components/Pagination/Pagination";
import { BsPlus } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Shift = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="home-contianer">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl xs:text-base font-normal">Go back</p>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-normal mr-[52px]">Shifts</h1>
          </div>
          <Link
            to="/create-shift"
            className="rounded-full p-2 bg-light-orange ml-8"
          >
            <BsPlus className="text-white w-6 h-6  lg:w-6 lg:h-6 xs:w-4 xs:h-4" />

          </Link>
        </div>
      </div>
      <NewShift />
      <Pagination />
    </div>
  );
};

export default Shift;
