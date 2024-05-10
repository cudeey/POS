import React from "react";

const EditTheProfile = () => {
  return (
    <>
      <div className="container flex justify-center">
        <div className="my-10">
          <div className="flex justify-center">
            <img src="/images/user.png" alt="User" />
          </div>
          <div className="flex gap-x-12 mt-6">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                id="text"
                className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                id="text"
                className=" border border-gray-300 text-gray-900 text-sm mt-1 rounded-lg  block w-full p-2.5 "
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="mt-5">
            <label>Phone Number</label>
            <input
              type="text"
              id="number"
              className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg  block w-full p-2.5 "
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mt-5">
            <label>Email</label>
            <input
              type="email"
              id="email"
              className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-5">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="block w-full rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white "
            >
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTheProfile;
