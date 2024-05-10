import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteInviteUser,
  getUserById,
  getUsers,
  updateInviteUser,
} from "../../store/slices/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EditTheUser = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job_title, setJob] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserById(id));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (users === undefined || users.length === 0) {
      dispatch(getUsers());
      return;
    }

    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setJob(user.job_title);
      setSelectedRole(user.role);
    }
  }, [users, id]);

  const handleEditUser = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      console.error("Name is required");
      return;
    }

    const userData = {
      name,
      email,
      password,
      job_title,
      role: selectedRole,
    };

    try {
      await dispatch(updateInviteUser({ id, updatedData: userData }));
      toast.success("Changes saved successfully!");
      navigate("/users");
    } catch (error) {
      toast.error(`Edit failed: ${error.message}`);
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleDelete = () => {
    dispatch(deleteInviteUser(id));
    navigate("/users");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container flex justify-center">
        <div className="mt-8">
          <div className="flex justify-center text-center">
            <h2 className="text-3xl font-semibold leading-10">Edit User</h2>
          </div>
          <form onSubmit={handleEditUser}>
            <div className="mt-10 w-100">
              <div className="mt-5">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label>Password</label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className=" ml-2 p-2 text-xl bg-light-orange rounded-md text-white font-semibold"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <label>Job</label>
                <input
                  type="text"
                  id="text"
                  className=" border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your role"
                  value={job_title}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <label>Choose Admin</label>
                <div className="flex items-center mb-6 mt-4">
                  <input
                    id="superAdmin"
                    type="checkbox"
                    value="superadmin"
                    checked={selectedRole === "superadmin"}
                    onChange={handleRoleChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="superAdmin"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Super Admin
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="admin"
                    type="checkbox"
                    value="admin"
                    checked={selectedRole === "admin"}
                    onChange={handleRoleChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="admin"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Admin
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white "
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>

          <div className="flex justify-center mt-4 mb-10">
            <p className="text-sm font-normal text-black-color text-center">
              Don't need this user?
            </p>
            <button
              className="text-red-500 ml-2 text-sm"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center">
              <button
                className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                No, cancel
              </button>
              <button
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTheUser;
