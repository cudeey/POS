import React from "react";

const TableMapCreate = ({ tables }) => {
  return (
    <div className="mt-2 grid grid-cols-5 gap-5 p-4 w-full lg:mt-2 lg:grid lg:grid-cols-5 lg:gap-5 lg:p-4 lg:w-full xs:grid-cols-2 xs:gap-4 xs:p-3 xs:w-10 xs:mt-10">
      {tables.map((table) => (
        <button
          key={table.id}
          className="border rounded-md w-170 h-54 flex justify-center p-2 shadow-lg cursor-pointer inactive"
        >
          <div className="rounded-full w-12 h-12 flex justify-center items-center font-light text-3xl text-gray-lighter bg-gray-color-light">
            {table.table_number}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TableMapCreate;
