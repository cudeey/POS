import React, { useState } from "react";

const EditImage = () => {
  const [photos, setPhotos] = useState([]);

  const handleFileUpload = (event) => {
    const newPhotos = Array.from(event.target.files);
    setPhotos([...photos, ...newPhotos]);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-456 mt-16">
        {photos.map((photo, index) => (
          <div className="relative group" key={index}>
            <img
              className="w-full"
              src={URL.createObjectURL(photo)}
              alt={`Uploaded Image ${index}`}
            />
            <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-dark-gray bg-opacity-90 text-white p-3 flex justify-between items-center">
                <h5 className="font-medium text-xs leading-5">
                  Salmon Gravlax
                </h5>
                <img src="images/delete-icon-white.svg" alt="Delete" />
              </div>
            </div>
          </div>
        ))}
        <div className="relative">
          <label htmlFor="file-upload" className="cursor-pointer">
            <img className="w-full" src="images/Menu-one.svg" alt="Menu" />
            <div className="absolute text-white justify-center items-center flex bottom-0 backdrop-blur-md w-full h-full">
              <h5 className="font-semibold leading-10 text-6xl">+</h5>
            </div>
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default EditImage;
