import CreateIngredient from "../../components/CreateIngredient/CreateIngredient";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Ingredient = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl xs:text-sm font-normal">
              Go back
            </p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl lg:text-xl xs:text-base font-normal mr-24">Add Ingredient</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-14">
        <CreateIngredient />
      </div>
    </div>
  );
};

export default Ingredient;
