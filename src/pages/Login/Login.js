import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleLoginEvent = async (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    try {
      dispatch(loginUser(credentials))
        .unwrap()
        .then((response) => {
          localStorage.setItem("token", response.token);
          navigate("/home");
          toast.success("You have successfully logged in!");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      toast.error("Email or password is wrong!");
    }
  };

  return (
    <div className="">
      <div className="signin-container items-center justify-center flex lg:w-48 sm:w-full">
        <section className="w-1/2 h-full lg:w-100 flex">
          <div className="form-container">
            <div className="grid place-items-center">
              <h1 className="text-3xl lg:text-3xl sm:text-xl">Welcome back</h1>
              <p className="text-base text-gray-color leading-6 mt-3 mb-6 lg:text-base  sm:text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>
            <form
              className="space-y-4 md:space-y-6 mx-auto max-w-md"
              onSubmit={handleLoginEvent}
            >
              <div className="flex flex-col lg:items-start sm:items-center">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col lg:items-start sm:items-center">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="">
                      Remember for 30 days
                    </label>
                  </div>
                </div>
                <a
                  href="forget-password"
                  className="font-semibold text-sm leading-5 text-orange-color lg:ml-3 mt-2 lg:mt-0"
                >
                  Forgot password
                </a>
              </div>
              <div className="flex flex-col lg:items-start sm:items-center">
                <button
                  type="submit"
                  className="text-base font-semibold leading-6 border border-orange-300 bg-light-orange text-white rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign in"}
                </button>
              </div>

              <p className="text-sm font-normal text-black-color mt-3.5 text-center">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-semibold text-sm leading-5 text-orange-color"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
          <ToastContainer />
        </section>

        <section className="w-1/2 h-full">
          <div className="relative h-full">
            <img
              src="images/Login.svg"
              className="w-full h-full object-cover img-container"
              alt="Signin"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
