import EditTheShift from "../../components/EditTheShift/EditTheShift";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditShift = () => {
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
            <h1 className="text-xl font-normal">Edit Shifts</h1>
          </div>
        </div>
      </div>
      <EditTheShift />
    </div>
  );
};

export default EditShift;
