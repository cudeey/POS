import React from "react";
import { useDispatch } from "react-redux";
import { createInviteUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  job_title: Yup.string().required("Job Title is required"),
  role: Yup.string().required("Role is required"),
});

const NewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleChange = (e, setFieldValue) => {
    setFieldValue("role", e.target.value);
  };

  const handleTogglePassword = (values, setFieldValue) => {
    setFieldValue("showPassword", !values.showPassword);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createInviteUser(values));
      resetForm();
      navigate("/users");
      toast.success("User Invited Successfully");
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  return (
    <div className="container flex justify-center">
      <div className="mt-8 lg:mt-8 xs:mt-0">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            job_title: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="w-100 mt-10">
              <div className="mt-5">
                <label>Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-5">
                <label>Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-5">
                <label>Password</label>
                <div className="flex items-center">
                  <Field
                    type={values.showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => handleTogglePassword(values, setFieldValue)}
                    className="ml-2 p-2.5 text-xl bg-light-orange rounded-md text-white font-semibold"
                  >
                    {values.showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-5">
                <label>Job</label>
                <Field
                  type="text"
                  id="job_title"
                  name="job_title"
                  className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter your job title"
                />
                <ErrorMessage
                  name="job_title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-6">
                <label>Choose Admin</label>
                <div className="flex items-center mb-6 mt-4">
                  <Field
                    type="checkbox"
                    id="superAdmin"
                    name="role"
                    value="superadmin"
                    checked={values.role === "superadmin"}
                    onChange={(e) => handleRoleChange(e, setFieldValue)}
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
                  <Field
                    type="checkbox"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={values.role === "admin"}
                    onChange={(e) => handleRoleChange(e, setFieldValue)}
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
                  className="block w-full rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Invite
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUsers;
