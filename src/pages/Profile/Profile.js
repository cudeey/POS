import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { FiEdit } from "react-icons/fi";
import MyProfile from "../../components/MyProfile/MyProfile";
import { Link } from "react-router-dom";

const Profile = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleIconMouseEnter = (iconName) => {
    setHoveredIcon(iconName);
  };

  const handleIconMouseLeave = () => {
    setHoveredIcon(null);
  };

  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="">
      <NavBar />
      <div className="flex justify-center bg-light-pink h-152">
        <div className="flex items-center text-center justify-between w-1240">
          <div className="flex" onClick={handleGoBack}>
            <img
              src="images/goback-icon.svg"
              alt="Go back"
              className="mr-2.5"
            />
            <p className="text-xl font-medium ">Go back</p>
          </div>
          <h1 className="text-xl font-medium">My Profile</h1>
          <div
            className={`p-3 rounded-full w-10 h-10 ${
              hoveredIcon === "edit" ? "bg-light-orange" : "bg-light-gray"
            }`}
            onMouseEnter={() => handleIconMouseEnter("edit")}
            onMouseLeave={handleIconMouseLeave}
          >
            <Link to="/edit-profile">
              <FiEdit
                className={`text-gray-color ${
                  hoveredIcon === "edit" ? "text-white" : ""
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
      <MyProfile />
    </div>
  );
};

export default Profile;
