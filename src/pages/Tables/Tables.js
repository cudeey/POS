import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";
import ReservedTables from "../../components/ReservedTables/ReservedTables";

const Tables = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="home-contianer">
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
          <div className="flex-1 text-center">
            <h1 className="text-xl font-normal">Reservation</h1>
          </div>
        </div>
      </div>
      <ReservedTables />
      <Pagination />
    </div>
  );
};

export default Tables;
