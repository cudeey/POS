import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";
import Shifts from "../../components/Shifts/Shifts";

const Reservation = () => {
  return (
    <div className="home-contianer">
      <NavBar />
      <div className="flex justify-center items-center bg-light-pink h-132">
        <h1 className="text-4xl font-bold">Reservation</h1>
      </div>
      <Shifts />
      <Pagination />
    </div>
  );
};

export default Reservation;
