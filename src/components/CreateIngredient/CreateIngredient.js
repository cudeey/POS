import React from "react";
import { useDispatch } from "react-redux";
import { createIngredient } from "../../store/slices/addIngredient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Ingredient Name is required"),
  unit: Yup.string().required("Unit is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  supplier: Yup.string().required("Supplier is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});

const CreateIngredient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      unit: "",
      price: "",
      supplier: "",
      category: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ingredients", values.name);
      formData.append("unit", values.unit);
      formData.append("cost", values.price);
      formData.append("supplier", values.supplier);
      formData.append("category", values.category);
      formData.append("description", values.description);

      try {
        await dispatch(createIngredient(formData));
        formik.resetForm();
        toast.success("Ingredient created successfully!");
        navigate("/ingredients");
      } catch (error) {
        toast.error(`Edit failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center xs:flex xs:justify-center ">
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Ingredient Name:</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] lg:w-[500px] p-2.5 xs:w-[200px]"
              placeholder="Enter ingredient name..."
              {...formik.getFieldProps("name")}
            />
            <div className="text-red-500 text-sm mt-1">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

          <div className="flex mt-4 gap-2  lg:flex-row xs:flex-col xs:w-[200px]">
            <div className="flex flex-col ">
              <label className="block text-sm font-medium ">Unit:</label>
              <input
                type="text"
                id="unit"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40 lg:w-40 "
                placeholder="Enter unit..."
                {...formik.getFieldProps("unit")}
              />
              <div className="text-red-500 text-sm mt-1">
                {formik.touched.unit && formik.errors.unit}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                id="price"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40"
                placeholder="Enter price..."
                {...formik.getFieldProps("price")}
              />
              <div className="text-red-500 text-sm mt-1">
                {formik.touched.price && formik.errors.price}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium">Supplier:</label>
              <input
                type="text"
                id="supplier"
                className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg p-2.5 w-40"
                placeholder="Enter supplier..."
                {...formik.getFieldProps("supplier")}
              />
              <div className="text-red-500 text-sm mt-1">
                {formik.touched.supplier && formik.errors.supplier}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Category:</label>
            <input
              type="text"
              id="category"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] p-2.5 xs:w-[200px] lg:w-[500px]"
              placeholder="Enter category..."
              {...formik.getFieldProps("category")}
            />
            <div className="text-red-500 text-sm mt-1">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              type=""
              id="description"
              className="border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg w-[500px] h-[100px] p-2.5 xs:w-[200px] lg:w-[500px]"
              placeholder="Enter description..."
              {...formik.getFieldProps("description")}
            />
            <div className="text-red-500 text-sm mt-1">
              {formik.touched.description && formik.errors.description}
            </div>
          </div> 

          <div className="flex mt-4 lg:justify-start xs:justify-center">
            <button
              type="submit"
              className="block w-74 mr-6 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredient;

