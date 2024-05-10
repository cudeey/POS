import NavBar from "../../components/NavBar/NavBar";
import NewReservation from "../../components/NewReservation/NewReservation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateReservation = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  
  return (
    <div className="home-container">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center xs:items-center">
          <button className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl font-normal xs:text-sm">Go back</p>
          </button>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-base lg:text-xl font-normal">Create Reservation</h1>
          </div>
        </div>
      </div>

      <div className="flex  ">
        <div className="container">
          <div className="w-full flex ">
            <div className=" ">
              <NewReservation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReservation;

