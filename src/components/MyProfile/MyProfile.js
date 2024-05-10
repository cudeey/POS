import React from "react";
import PropTypes from "prop-types";

const MyProfile = ({ userData }) => {
  if (!userData) {
    return <div className="flex justify-center">Loading...</div>;
  }

  const { name, email, role, created_at, job_title } = userData;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container flex justify-center">
      <div className="mt-14 mb-8 w-390">
        <div className="flex justify-center">
          <img src="/images/user.png" alt="User" />
        </div>
        <div>
          <div className="flex mt-4 text-center items-center">
            <label className="text-sm font-medium text-darker-gray cursor-pointer mr-14 ">
              Name
            </label>
            <input
              type="text"
              id="text"
              value={name || ""}
              className="text-black text-sm pointer-events-none  block w-full p-2.5 "
              placeholder="Enter your name"
            />
          </div>
          <div className="h-0.5 bg-light-gray"></div>
        </div>
        <div>
          <div className="flex mt-4 text-center items-center">
            <label className="text-sm font-medium text-darker-gray cursor-pointer mr-14 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email || ""}
              className="text-black text-sm pointer-events-none block w-full p-2.5 "
              placeholder="Enter your email"
            />
          </div>
          <div className="h-0.5 bg-light-gray"></div>
        </div>
        <div>
          <div className="flex mt-4 text-center items-center">
            <label className="text-sm font-medium text-darker-gray whitespace-nowrap cursor-pointer mr-9">
              Job Title
            </label>
            <input
              type="email"
              id="email"
              value={job_title || ""}
              className="text-black text-sm pointer-events-none block w-full p-2.5 "
              placeholder="Super Admin"
            />
          </div>
          <div className="h-0.5 bg-light-gray"></div>
        </div>
        <div>
          <div className="flex mt-4 text-center items-center">
            <label className="text-sm font-medium text-darker-gray cursor-pointer">
              Role
            </label>
            <input
              type="email"
              id="email"
              value={role || ""}
              className="text-black text-sm pointer-events-none block w-full p-2.5 ml-[64px]"
              placeholder="Super Admin"
            />
          </div>
          <div className="h-0.5 bg-light-gray"></div>
        </div>
        <div>
          <div className="flex mt-4 text-center items-center">
            <label className="text-sm font-medium text-darker-gray cursor-pointer mr-12">
              Joined
            </label>
            <input
              type="text"
              id="text"
              value={formattedDate || ""}
              className="text-black text-sm pointer-events-none block w-full p-2.5  "
              placeholder="Enter your username"
            />
          </div>
          <div className="h-0.5 bg-light-gray"></div>
        </div>
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    created_at: PropTypes.string,
    job_title: PropTypes.string,
  }),
};

export default MyProfile;
