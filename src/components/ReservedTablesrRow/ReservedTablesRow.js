import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiBlock } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BsClock } from "react-icons/bs";
import StarRating from "../../components/StarRating/StarRating";
import { useDispatch } from "react-redux";
import { getReservation } from "../../store/slices/getReservation";
import { deleteReservation } from "../../store/slices/deleteReservation";

const ReservedTablesRow = ({ data }) => {
  const dispatch = useDispatch();

  // const dataReservation = useSelector((state) => state.apiGetReservation.data);

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
        <div key={item.id} className="w-1240">
          <form>
            <div className="flex">
              <div className="rounded-lg shadow-md h-157 w-310  flex items-center justify-center text-[70px] text-red-color">
                {/* <PiNumberTwo className="w-28 h-52 text-red-color" /> */}
                {item.table_id}
              </div>
              <div className="flex items-center">
                <div className="flex flex-col ">
                  <div className="ml-7">
                    <p className=" font-normal text-lg leading-7 text-light-orange">
                      {item.description}
                    </p>
                    <div className="flex items-center">
                      <h5 className="text-xl font-semibold leading-8 tracking-tight text-gray-900 ">
                        {item.name}
                      </h5>
                      <div className="flex items-center justify-center border p-1 bg-lighter-red rounded-lg border-red-400 ml-3">
                        <TbPointFilled className="w-5 h-5 text-red-color" />
                        <p className="text-red-color text-sm font-medium mr-1.5">
                          Reserved
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-color font-normal text-base leading-6">
                        {item.date}
                      </p>
                      <BsClock className="mr-4 ml-4" />
                      <p className="text-base text-black-color font-medium">
                        {item.time !== undefined ? item.time.slice(0, 8) : ""}
                      </p>
                    </div>
                    <p className="mt-1 font-normal text-sm leading-8 text-gray-color">
                      {item.comment}
                    </p>
                    <div className="h-0.5 w-659 bg-lighter-gray mb-3"></div>
                    <StarRating />
                  </div>
                </div>
                <div className="flex w-8 h-8 ml-9  cursor-pointer">
                  <Link to={`/edit-reservation/${item.id}`}>
                    <div className="mr-2 p-2 rounded-full bg-light-pink">
                      <FiEdit className="text-gray-color" />
                    </div>
                  </Link>
                  <div>
                    <div
                      className="mr-2 p-2 rounded-full bg-light-pink "
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
            </div>
          </form>
        </div>
      ))}
    </>
  );
};

export default ReservedTablesRow;
