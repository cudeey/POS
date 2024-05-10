import NavBar from "../../components/NavBar/NavBar";
import ReservationsForMonth from "../../components/ReservationsForMonth/ReservationsForMonth";

const MonthlyReservation = () => {
  return (
    <div className="home-contianer">
      <NavBar />
      <ReservationsForMonth />
    </div>
  );
};

export default MonthlyReservation;
