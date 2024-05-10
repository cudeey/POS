import NavBar from "../../components/NavBar/NavBar";
import Recipes from "../../components/Recipes/Recipes";

const Home = () => {
  return (
    <div className="home-contianer">
      <NavBar />
      <div className="flex justify-center items-center bg-light-pink h-132">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Recipes</h1>
          <p className="text-lg text-gray-light">
            Cooking is where love and creativity meet...
          </p>
        </div>
      </div>
      <Recipes />
    </div>
  );
};

export default Home;
