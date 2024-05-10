import NavBar from "../../components/NavBar/NavBar";
import TableLeft from "../../components/TablesLeft/TableLeft";
import TableRight from "../../components/TableRight/TableRight";

const BlackList = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div>
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
            <h1 className="text-xl font-normal">Table Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="container">
          <div className="flex justify-center">
            <div className="w-1/2 overflow-hidden">
              {" "}
              <TableLeft />
            </div>
            <div className="w-1/2 justify-end overflow-hidden">
              {" "}
              <TableRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackList;
