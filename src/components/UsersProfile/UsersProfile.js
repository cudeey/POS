import UserDetails from "../UserDetails/UserDetails";

const UsersProfile = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-center mt-14 gap-x-48">
          <UserDetails />
        </div>
        <div className="flex justify-center my-10 gap-x-48"></div>
      </div>
    </>
  );
};

export default UsersProfile;
