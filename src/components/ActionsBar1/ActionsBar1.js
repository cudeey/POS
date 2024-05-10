import { useState, useEffect, useRef } from "react";

const ActionsBar1 = () => {
  const [importOptionsVisible, setImportOptionsVisible] = useState(false);
  const importRef = useRef(null);

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

  return <div className="flex"></div>;
};

export default ActionsBar1;
