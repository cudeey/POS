import { PiNumberOne } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";

const FreeTablesRow = () => {
  return (
    <div className="w-1240">
      <div className="flex">
        <div className=" rounded-lg shadow-md h-157 w-310 flex items-center justify-center">
          <PiNumberOne className="w-28 h-52 text-green-color" />
        </div>
        <div className="flex items-center">
          <div className="flex items-center ml-7">
            <h5 className="text-xl font-semibold leading-8 tracking-tight text-gray-900 ">
              Table 22
            </h5>
            <div className="flex items-center justify-center border p-1 bg-lighter-green rounded-lg border-green-400 ml-3">
              <TbPointFilled className="w-5 h-5 text-green-color" />
              <p className="text-dark-green text-sm font-medium mr-1.5">Free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTablesRow;
