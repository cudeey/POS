import React from "react";

const ProfileOfTheUser = () => {
  return (
    <>
      <div className="container flex justify-center">
        <div className="mt-14 mb-8 w-390">
          <div className="flex justify-center">
            <img src="images/user.svg" alt="User" />
          </div>
          <div>
            <div className="flex mt-4 text-center items-center">
              <label className="text-sm font-medium text-darker-gray">
                Name
              </label>
              <input
                type="text"
                id="text"
                className="text-black text-sm block w-full p-2.5 ml-12"
                placeholder="Enter your name"
              />
            </div>
            <div className="h-0.5 bg-light-gray"></div>
          </div>
          <div>
            <div className="flex mt-4 text-center items-center">
              <label className="text-sm font-medium text-darker-gray">
                Username
              </label>
              <input
                type="text"
                id="text"
                className="text-black text-sm block w-full p-2.5 ml-6"
                placeholder="Enter your username"
              />
            </div>
            <div className="h-0.5 bg-light-gray"></div>
          </div>
          <div>
            <div className="flex mt-4 text-center items-center">
              <label className="text-sm font-medium text-darker-gray">
                Number
              </label>
              <input
                type="text"
                id="number"
                className="text-black text-sm block w-full p-2.5 ml-10"
                placeholder="Enter your username"
              />
            </div>
            <div className="h-0.5 bg-light-gray"></div>
          </div>
          <div>
            <div className="flex mt-4 text-center items-center">
              <label className="text-sm font-medium text-darker-gray">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-black text-sm block w-full p-2.5 ml-14"
                placeholder="Enter your username"
              />
            </div>
            <div className="h-0.5 bg-light-gray"></div>
          </div>
          <div>
            <div className="flex mt-4 text-center items-center">
              <label className="text-sm font-medium text-darker-gray">
                Admin
              </label>
              <input
                type="email"
                id="email"
                className="text-black text-sm block w-full p-2.5 ml-12"
                placeholder="Super Admin"
              />
            </div>
            <div className="h-0.5 bg-light-gray"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOfTheUser;
