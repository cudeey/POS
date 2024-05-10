import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Sigin = () => {
  const handleSigninEvent = async (values) => {
    const credentials = {
      email: values.email,
    };
  };

  const RegisterValidation = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email"),
  });

  return (
    <div className="">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={RegisterValidation}
        onSubmit={handleSigninEvent}
      >
        <div className="signin-container items-center justify-center  flex lg:w-48 sm:w-full">
          <section className="w-1/2 h-full lg:w-100 flex ">
            <div className="form-container">
              <div className="grid place-items-center">
                <h1 className="text-3xl">Change New Password</h1>
                <p className="text-base text-gray-color leading-6 mt-3 mb-6">
                  Enter a different password with the previous.
                </p>
              </div>
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    New Password
                  </label>
                  /images/Login.svg
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="border border-gray-300 rounded-lg block w-full p-2.5"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="text-base font-semibold leading-6 border border-orange-300 bg-light-orange
                  text-white rounded-lg block w-full p-2.5"
                >
                  Reset Password
                </button>

                <p className="text-sm font-normal text-black-color mt-3.5 text-center">
                  Remember the password?{" "}
                  <a
                    href="/"
                    className="font-semibold text-sm leading-5 text-orange-color"
                  >
                    Log in
                  </a>
                </p>
              </Form>
            </div>
          </section>

          <section className="w-1/2 h-full">
            <div className="relative h-full">
              <img
                src="images/Login.svg"
                className="w-full h-full object-cover img-container"
                alt="Signin"
              />
              <div className="absolute text-white p-8 bottom-0 backdrop-blur-md w-full">
                <h4 className="text-3xl font-semibold leading-10">
                  "People who love to eat are always the best people."
                </h4>
                <div className="flex mt-7 justify-between">
                  <h3 className="text-4xl font-semibold">Double Burger</h3>
                  <img src="images/Stars.svg" alt="rate" className="mb-1" />
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <p className="mt-3">Standard ingredients</p>
                    <p className="mt-1">740 Cal.</p>
                  </div>
                  <div className="flex mt-4">
                    <img
                      src="images/arrow-left.svg"
                      alt="arrow-left"
                      className="mr-8"
                    />
                    <img src="images/arrow-right.svg" alt="arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Formik>
    </div>
  );
};

export default Sigin;
