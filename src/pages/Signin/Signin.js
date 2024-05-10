import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupUser } from "../../store/slices/authSlice";

const Sigin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleSignupEvent = async (e) => {
    e.preventDefault();
    const credentials = {
      name,
      email,
      password,
    };
    try {
      await dispatch(signupUser(credentials)).unwrap();
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
      toast.success("You have successfully registered.");
    } catch (error) {
      toast.error("Please write the credentials");
    }
  };

  const RegisterValidation = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!").email("Invalid email"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
  });

  return (
    <div className="">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterValidation}
      >
        <div className="signin-container items-center justify-center  flex lg:w-48 sm:w-full">
          <section className="w-1/2 h-full lg:w-100 flex ">
            <div className="form-container">
              <div className="grid place-items-center">
                <h1 className="text-3xl lg:text-3xl sm:text-xl">Sign up</h1>
                <p className="text-base text-gray-color leading-6 mt-3 mb-6">
                  Start your 30-day free trial.
                </p>
              </div>
              <Form
                className="space-y-4 md:space-y-6 mx-auto max-w-md"
                onSubmit={handleSignupEvent}
              >
                <div className="flex flex-col lg:items-start sm:items-center">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="flex flex-col lg:items-start sm:items-center">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="flex flex-col lg:items-start sm:items-center">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="flex flex-col lg:items-start sm:items-center">
                  <button
                    type="submit"
                    className="text-base font-semibold leading-6 border border-orange-300 bg-light-orange text-white rounded-lg block w-full p-2.5 lg:w-full md:w-314 sm:w-286"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Get started"}
                  </button>
                </div>
                <p className="text-sm font-normal text-black-color mt-3.5 text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-sm leading-5 text-orange-color"
                  >
                    Log in
                  </a>
                </p>
              </Form>
            </div>
            <ToastContainer />
          </section>

          <section className="w-1/2 h-full">
            <div className="relative h-full">
              <img
                src="images/Sigin.svg"
                className="w-full h-full object-cover img-container"
                alt="Signin"
              />
            </div>
          </section>
        </div>
      </Formik>
    </div>
  );
};

export default Sigin;
