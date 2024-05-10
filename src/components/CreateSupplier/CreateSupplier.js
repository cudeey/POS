import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../store/slices/addSupplier";

const CreateSupplier = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector((state) => state.suppliers);

  const handleCreateSupplier = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("supplierName", name);
    formData.append("companyName", companyName);
    formData.append("phoneNumber", phone);
    console.log("company", companyName);

    try {
      await dispatch(createSupplier(formData));
      setName("");
      setCompanyName("");
      setPhone("");
      navigate("/create");
    } catch (error) {
      toast.error(`Edit failed: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <form onSubmit={handleCreateSupplier}>
        <label className="block text-sm font-medium mb-2">Supplier Name</label>
        <input
          type="text"
          id="text"
          className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg w-[500px] p-2.5"
          placeholder="Enter supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-sm font-medium mb-2 mt-3">
          Company Name
        </label>
        <input
          type="text"
          id="text"
          className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg w-[500px] p-2.5"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label className="block text-sm font-medium mb-2 mt-3">
          Phone Number
        </label>
        <input
          type="text"
          id="text"
          className="border border-gray-300 text-gray-900 mt-1 text-sm rounded-lg w-[500px] p-2.5"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex mt-4">
          <button
            type="submit"
            className="block w-74 mr-6 rounded-md bg-light-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
