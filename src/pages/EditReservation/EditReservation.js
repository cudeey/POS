import EditTheReservation from "../../components/EditTheReservation/EditTheReservation";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditReservation = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="home-container">
      <NavBar />
      <div className="flex justify-center bg-light-pink h-89">
        <div className="container flex items-center text-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-lg font-normal xs:text-sm">Go back</p>
          </div>
          <div className="flex-auto text-center justify-center items-center">
            {" "}
            <h1 className="text-xl lg:text-xl xs:text-base font-normal">Edit Reservation</h1>
          </div>
        </div>
      </div>
      <div className="flex  ">
        <div className="container">
          <div className="w-full flex">
            <div className=" ">
              <EditTheReservation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReservation;
