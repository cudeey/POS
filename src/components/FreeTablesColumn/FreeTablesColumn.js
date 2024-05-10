import { PiNumberOne } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";

const FreeTablesColumn = () => {
  return (
    <div className="pb-10 pt-3">
      <div className="w-full rounded-lg shadow-md h-157 flex items-center justify-center text-green-color text-[70px]">
        1
      </div>
      <div>
        <div className=" w-286 mt-4">
          <div className="flex  items-center">
            <h5 className="text-xl font-semibold leading-8 tracking-tight text-gray-900 ">
              Table 22
            </h5>
            <TbPointFilled className="w-5 h-5 text-green-color ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTablesColumn;
