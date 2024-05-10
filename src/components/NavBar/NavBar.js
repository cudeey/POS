import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchDataRecipesSearch } from "../../store/slices/apiRecipes";
import { fetchDataReservationsSearch } from "../../store/slices/getReservation";
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [settingsOptions, setSettingsOptions] = useState(false);
  const settingsRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResults = useSelector((state) => state.apiRecipes.data.recipes);
  const searchResultsReservation = useSelector(
    (state) => state.apiGetReservation.data
  );
  const searchResultsMenu = useSelector((state) => state.apiRecipes.data);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLinkClick = (option) => {
    setActiveLink(option.text === activeLink ? null : option.text);

    if (option.link) {
      navigate(option.link);
      setShowSearchResults(false);
    } else if (option.id) {
      navigate(`/details/${option.id}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result, e) => {
    e.stopPropagation();
    setShowSearchResults(false);
  };

  const handleSearch = (query) => {
    if (typeof query === "string" && query.trim() !== "") {
      if (
        location.pathname === "/home" ||
        location.pathname === "/menu" ||
        location.pathname.startsWith("/details/:id")
      ) {
        dispatch(fetchDataRecipesSearch(query));
      } else if (location.pathname === "/reservation") {
        dispatch(fetchDataReservationsSearch(query));
      }
    }
  };

  const toggleSettingsOptions = () => {
    setSettingsOptions((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleSearchResults = () => {
    setShowSearchResults(!showSearchResults);
  };

  const options = [
    { text: "User", link: "/users" },
    { text: "Shift", link: "/shift" },
    { text: "Profile", link: "/profile" },
    { text: "Invite User", link: "/invite-user" },
  ];

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOptions(false);
      }
      if (!document.getElementById("search-navbar").contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const hideSearchResults = () => {
    setShowSearchResults(false);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
    setShowSearchResults(filtered.length > 0);
  };

  const filtered =
    location.pathname === "/menu"
      ? searchResultsMenu || []
      : location.pathname === "/reservation"
      ? searchResultsReservation
        ? searchResultsReservation.filter((result) =>
            result.name && searchQuery
              ? result.name.toLowerCase().startsWith(searchQuery.toLowerCase())
              : false
          )
        : []
      : location.pathname === "/home" || location.pathname.includes("/details/")
      ? searchResults
        ? searchResults.filter((result) =>
            result.title && searchQuery
              ? result.title.toLowerCase().startsWith(searchQuery.toLowerCase())
              : false
          )
        : []
      : [];

  return (
    <div className="bg-light-pink ">
      <nav className=" border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center xs:justify-between justify-between mx-auto p-4 ">
          <div className="flex items-center">
            <img
              src="/images/soma-logo.svg"
              className="h-8  mr-24 xs:mr-5"
              alt="Recetat"
            />          
          </div>

          <div className="relative  w-916 lg:w-916 md:w-10 sm:w-10 xs:w-11 flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <button onClick={handleSearch}>
                <svg
                  className="w-4 h-4 text-light-gray-two"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block text-black w-full rounded-lg placeholder-light-gray-two p-2 pl-10 text-sm text-900 border border-black bg-light-pink"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                toggleSearchResults();
                handleSearch(query);
              }}
            />
          </div>
          <ul className="flex flex-col ml-4 p-4 md:p-0 mt-4 font-normal text-sm  md:flex-row md:space-x-8 md:mt-0 sm:flex-row sm:mt-1 xs:flex-row xs:mt-1 xs:ml-0 ">
            <div
              className={`flex cursor-pointer ${
                settingsOptions ? "justify-center" : ""
              }`}
              onClick={toggleSettingsOptions}
              ref={settingsRef}
            >
              <p className={`text-base xs:text-sm ${settingsOptions ? "mb-0 " : ""}`}>
                Settings
              </p>
              <IoIosArrowDown
                className={`mt-1.5 ml-2  xs:mt-1 ${settingsOptions ? "mb-0" : ""}`}
              />
              {settingsOptions && (
                <div className="absolute bg-white border border-gray-300 mt-10 rounded-md p-2 w-172 xs:w-120 ">
                  {options.map((option) =>
                    option.link ? (
                      <Link to={option.link} key={option.text}>
                        <div className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer">
                          {option.text}
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={option.text}
                        className="flex justify-center hover:bg-light-orange hover:rounded-md hover:text-white hover:w-full text-center text-gray-text text-xs w-full py-2 cursor-pointer"
                      >
                        {option.text}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="block py-2 pl-3 pr-4 text-gray-900   md:p-0 sm:p-0 xs:p-0"
            >
              <IoIosLogOut className="h-6 w-6 flex justify-center mr-4 md:ml-4  xs:ml-2 xs:h-5"/>
            </button>
          </ul>
        </div>
      </nav>
      <div className="container-search flex " style={{ marginTop: "-0.2rem" }}>
        <div className="  container-search-inputs  ">
          {showSearchResults && (
            <div
              className="container-search flex "
              style={{ marginTop: "-1rem" }}
            >
              <div className="container-search-inputs  lg:flex lg:justify-center xs:flex xs:justify-center   ">
                {filtered.length > 0 ? (
                  <div className="border border-gray-300 rounded-lg bg-light-pink w-full 2xl:w-1010 2xl:ml-[120px] lg:w-1010 lg:ml-[80px] md:w-200 sm:w-340 sm:ml-[22px] xs:w-60 xs:mr-12  ">
                    {filtered.slice(0, 5).map((result, index) => (
                      <div
                        className={`border-gray-300 p-2 border-b py-2 flex justify-between w-full lg:w-1010  sm:w-340 xs:w-60 ${
                          index === 4 ? "border-b-0" : ""
                        }`}
                        key={result.id}
                        onClick={(e) => {
                          handleSearchResultClick(result, e);
                        }}
                      >
                        <div>
                          {location.pathname === "/home" ||
                          location.pathname === "/menu" ||
                          location.pathname.startsWith("/details") ? (
                            <Link to={`/details/${result.id}`}>
                              <p className="text-black font-medium lg:font-medium lg:text-sm xs:text-xs">
                                {result.title}
                              </p>
                              <p className="text-gray-500 lg:text-sm xs:text-xs">
                                {result.categories}
                              </p>
                            </Link>
                          ) : (
                            <div>
                              <p className="text-black font-medium lg:text-sm xs:text-xs">
                                {result.name}
                              </p>
                              <p className="text-gray-500 lg:text-sm xs:text-xs">
                                {result.description}
                              </p>
                              <p className="text-gray-500 lg:text-sm xs:text-xs">{result.date}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          {location.pathname === "/home" ||
                          location.pathname.startsWith("/details") ? (
                            <Link to={`/details/${result.id}`}>
                              {result.video && result.video.length > 0 && (
                                <img
                                  src={`https://backrecrez.bbros.al/${result.video[0].path}`}
                                  alt={`First`}
                                  className="w-20 h-15 lg:w-16 lg:h-14 xs:w-6 xs:h-6"
                                />
                              )}
                            </Link>
                          ) : location.pathname === "/menu" ? (
                            <Link to={`/details/${result.id}`}>
                              {result.video && result.video.length > 0 && (
                                <img
                                  src={`https://backrecrez.bbros.al/${result.video[0].path}`}
                                  alt={`First`}
                                  className="w-20 h-15 lg:w-16 lg:h-14 xs:w-12 xs:h-10"
                                />
                              )}
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ))}

                    {filtered.length > 5 && (
                      <div
                        className="border-gray-300 p-2 border-b py-2 w-full"
                        onClick={(e) => {}}
                      >
                        <p className="font-light text-gray-500 cursor-pointer">
                          View More Results
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="font-light text-red-500 italic">
                      No results found ...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-0.5 bg-light-gray mt-4"></div>
      <div className="flex justify-center py-4 text-light-brown">
        <Link
          to="/menu"
          className={`px-4 py-2 mx-2 text-m font-normal ${
            activeLink === "Menu" ? "bg-light-orange text-white rounded-md" : ""
          }`}
        >
          Menu
        </Link>
        <Link
          to="/reservation"
          className={`px-4 py-2 mx-2 text-m font-normal ${
            activeLink === "Reservation"
              ? "bg-light-orange text-white rounded-md"
              : ""
          }`}
        >
          Reservation
        </Link>
        <Link
          to="/home"
          className={`px-4 py-2 mx-2 text-m font-normal ${
            activeLink === "Recipes"
              ? "bg-light-orange text-white rounded-md"
              : ""
          }`}
        >
          Recipes
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
