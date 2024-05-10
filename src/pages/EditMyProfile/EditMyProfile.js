import EditTheProfile from "../../components/EditTheProfile/EditTheProfile";
import NavBar from "../../components/NavBar/NavBar";

const EditMyProfile = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="home-container">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <img
              src="images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5 w-7 h-7"
            />
            <p className="text-xl font-normal">Go back</p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal mr-28">Edit</h1>
          </div>
        </div>
      </div>
      <EditTheProfile />
    </div>
  );
};

export default EditMyProfile;
