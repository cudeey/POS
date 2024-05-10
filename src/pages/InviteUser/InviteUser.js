import NavBar from "../../components/NavBar/NavBar";
import NewUsers from "../../components/NewUsers/NewUsers";
import { AiOutlineArrowLeft } from "react-icons/ai";

const InviteUser = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="">
      <NavBar />
      <div className="bg-light-pink h-89">
        <div className="container flex items-center">
          <div className="flex items-center" onClick={handleGoBack}>
            <AiOutlineArrowLeft className="mr-2" />
            <p className="text-xl lg:text-xl xs:text-base font-normal">Go back</p>
          </div>
          <div className="flex-1 text-center justify-center items-center">
            {" "}
            <h1 className="text-xl font-normal mr-24">Invite User</h1>
          </div>
        </div>
      </div>
      <NewUsers />
    </div>
  );
};

export default InviteUser;
