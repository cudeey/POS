import { useState, useEffect, useRef } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";

const ActionsBar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [importOptionsVisible, setImportOptionsVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const importRef = useRef(null);

  const handleIconMouseEnter = (iconName) => {
    setHoveredIcon(iconName);
  };

  const handleIconMouseLeave = () => {
    setHoveredIcon(null);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (importRef.current && !importRef.current.contains(event.target)) {
        setImportOptionsVisible(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="flex">
      <div
        className={`p-3 rounded-full w-10 h-10 ml-6 ${
          hoveredIcon === "delete" ? "bg-light-orange" : "bg-light-gray"
        }`}
        onMouseEnter={() => handleIconMouseEnter("delete")}
        onMouseLeave={handleIconMouseLeave}
        onClick={toggleDeleteModal}
      >
        <RiDeleteBin4Line
          className={`text-gray-color ${
            hoveredIcon === "delete" ? "text-white" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ActionsBar;
