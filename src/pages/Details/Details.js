import NavBar from "../../components/NavBar/NavBar";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="edit-container">
      <NavBar />
      <div className="flex justify-center bg-light-pink h-89">
        <div className="flex items-center text-center   w-1240">
          <div className="flex" onClick={handleGoBack}>
            <img
              src="/images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5"
            />
            <p className="text-xl font-medium ">Go back</p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal">Recipe Details</h1>
          </div>
        </div>
      </div>

      <div className="flex  ">
        <div className="container">
          <div className="w-full flex ">
            <div className=" ">
              <RecipeDetails id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
