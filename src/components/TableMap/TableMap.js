import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const TableMap = ({
  tables,
  isTableReserved,
  handleNumberClick,
  openModal,
}) => {
  return (
    <div className="mt-16 grid grid-cols-5 gap-5 p-4 lg:grid-cols-5 lg:gap-5 lg:p-4 lg:mt-14 lg:ml-4 xs:grid-cols-2 xs:gap-4 xs:p-3 xs:mt-6 xs:ml-4">
      {tables.map((table) => {
        const reserved = isTableReserved(table.table_number);
        const isActive = table.reservations && table.reservations.length > 0;

        return (
          <button
            key={table.id}
            className={`border rounded-md lg:w-170 h-54 flex justify-center p-2 shadow-lg xs:w-22 cursor-pointer ${
              isActive ? "active" : "inactive"
            }`}
            onClick={() => handleNumberClick(table.table_number)}
          >
            <div
              className={`rounded-full w-12 h-12 flex justify-center items-center font-light text-3xl text-gray-lighter ${
                reserved
                  ? "text-orange-dark bg-orange-light"
                  : isActive
                  ? "text-orange-dark bg-orange-light"
                  : "text-gray-color bg-gray-color-light"
              }`}
            >
              {table.table_number}
              {(reserved || isActive) && (
                <span className="absolute mt-9  ml-9 flex justify-center items-center rounded-full bg-green-color w-4 h-4">
                  <MdOutlineDone color="white" />
                </span>
              )}
            </div>
            <div className="flex mt-6 "> 
            <IoPerson className="text-orange-dark" />
            <div className="text-sm mt-1 text-gray-color  ">
            {table.people_count}
            </div>
            </div>
          </button>
        );
      })}

      <button
        className="border rounded-md w-170 h-54 flex justify-center p-2 shadow-lg cursor-pointer"
        onClick={openModal}
      >
        <div className="rounded-full w-12 h-12 flex justify-center items-center font-light text-3xl text-gray-color bg-gray-color-light">
          <div className="flex justify-center items-center mb-1">+</div>
        </div>
      </button>
    </div>
  );
};

export default TableMap;
