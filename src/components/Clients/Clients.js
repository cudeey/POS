import { addStar, getReservation } from "../../store/slices/getReservation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { RiStarFill, RiStarSLine } from "react-icons/ri";
import PropTypes from "prop-types";

const Clients = ({ id, name, number, stars }) => {
  const dispatch = useDispatch();

  const handleBiblockClick = (reservationId) => {
    dispatch(addStar(reservationId))
      .unwrap()
      .then(() => {
        toast.success("Stars added successfully");
        dispatch(getReservation());
      })
      .catch((error) => {
        toast.error("Failed to add more than 5 stars");
      });
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between border rounded-lg mb-4 px-5 py-3 relative mt-4">
          <div className="font-mediu text-gray-900 whitespace-nowrap lg:whitespace-nowrap w-14 xs:whitespace-normal">
            {name}
          </div>
          <div>{number}</div>
          <div>
            <div
              className="flex gap-1"
              onClick={() => handleBiblockClick(id)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className=" ">
                  {index < stars ? (
                    <RiStarFill className="text-yellow-500" />
                  ) : (
                    <RiStarSLine className="text-black" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Clients.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
};

export default Clients;
