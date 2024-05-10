import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiBlock } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { BsClock } from "react-icons/bs";
import StarRating from "../../components/StarRating/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../store/slices/getReservation";
import { deleteReservation } from "../../store/slices/deleteReservation";

const ReservedTablesColumn = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  const handleDeleteReservation = (itemId) => {
    dispatch(deleteReservation(itemId))
      .unwrap()
      .then(() => {
        console.log("Deleted Successfully");
        window.location.reload();
        return;
      })
      .catch((error) => {
        console.log("Delete faild:", error);
      });
  };
  return (
    <>
      {data?.map((item) => (
        <div key={item.id} className="pb-10 pt-3">
          <div className="w-full rounded-lg shadow-md h-157 flex items-center justify-center text-[70px] text-red-color">
            {item.table_id}
          </div>
          <div>
            <div className="w-286  mt-5">
              <div className="flex items-center">
                <h5 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                  {item.name}
                </h5>
                <TbPointFilled className="w-5 h-5 text-red-color ml-2" />
              </div>
              <div className="flex cursor-pointer my-2">
                <Link to={`/edit-reservation/${item.id}`}>
                  <div className="mr-2 p-2 rounded-full bg-light-pink">
                    <FiEdit className="text-gray-color " />
                  </div>
                </Link>
                <div>
                  <div
                    className="mr-2 p-2 rounded-full bg-light-pink"
                    onClick={() => handleDeleteReservation(item.id)}
                  >
                    <RiDeleteBin4Line className="text-gray-color " />
                  </div>
                </div>
                <Link to="/blacklist">
                  <div className="flex">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="mr-2 p-2 rounded-full bg-light-pink"
                      >
                        <BiBlock className="text-gray-color" />
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-gray-color font-normal text-base leading-6">
                {item.date}
              </p>
              <BsClock className="ml-4" />
              <p className="text-base text-black-color font-medium ml-2">
                {item.time !== undefined ? item.time.slice(0, 8) : ""}
              </p>
            </div>

            <p className="mt-1 font-normal text-lg leading-7 text-light-orange">
              {item.description}
            </p>

            <div className="h-0.5 bg-lighter-gray mb-3"></div>

            <StarRating />
          </div>
        </div>
      ))}
    </>
  );
};

export default ReservedTablesColumn;
