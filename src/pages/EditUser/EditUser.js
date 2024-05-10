import EditTheUser from "../../components/EditTheUser/EditTheUser";
import NavBar from "../../components/NavBar/NavBar";

const EditUser = () => {
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
              src="/images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5 w-7 h-7"
            />
            <p className="text-xl font-normal">Go back</p>
          </div>
        </div>
      </div>
      <EditTheUser />
    </div>
  );
};

export default EditUser;
