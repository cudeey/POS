import React from "react";

const TableModal = ({
  isModalOpen,
  tableData,
  handleInputChange,
  handleAddTable,
  closeModal,
}) => {
  return (
    isModalOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto ">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 xs:items-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Enter Table Information
              </h3>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Table Number:
                </label>
                <input
                  type="text"
                  name="table_number"
                  value={tableData.table_number}
                  onChange={handleInputChange}
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  People Count:
                </label>
                <input
                  type="text"
                  name="people_count"
                  value={tableData.people_count}
                  onChange={handleInputChange}
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleAddTable}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Table
              </button>
              <button
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TableModal;
