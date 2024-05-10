import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  Login,
  ForgetPassword,
  NewPassword,
  Home,
  Signin,
  Edit,
  Details,
  Create,
  Menu,
  OneMenu,
  FilterMenu,
  Reservation,
  Tables,
  CreateReservation,
  BlackList,
  ClientList,
  TableDashboard,
  EditReservation,
  InviteUser,
  Users,
  Profile,
  CreateShift,
  EditShift,
  EditUser,
  UserProfile,
  EditMyProfile,
} from "../src/pages/index";
import "./App.css";
import Shift from "./pages/Shift/Shift";
import Ingredient from "./pages/Ingredient/Ingredient";
import Supplier from "./pages/Supplier/Supplier";
import MonthlyReservation from "./pages/MonthlyReservations/MonthlyReservation";
import IngredientsTable from "./pages/IngredientsTable/IngredientsTable";
import EditIngredientForm from "./pages/EditIngredintForm/EditIngredientForm";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/menu"
        element={
          isAuthenticated() ? <Menu /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/signup" element={<Signin />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route
        path="/edit/:id"
        element={
          isAuthenticated() ? <Edit /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/details/:id"
        element={
          isAuthenticated() ? <Details /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/create"
        element={
          isAuthenticated() ? <Create /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/product" element={<OneMenu />} />
      <Route path="/filter-menu" element={<FilterMenu />} />
      <Route
        path="/reservation"
        element={
          isAuthenticated() ? <Reservation /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/reserved-tables"
        element={
          isAuthenticated() ? <Tables /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/create-reservation"
        element={
          isAuthenticated() ? (
            <CreateReservation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/edit-reservation/:id"
        element={
          isAuthenticated() ? (
            <EditReservation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/blacklist"
        element={
          isAuthenticated() ? <BlackList /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/client-list"
        element={
          isAuthenticated() ? <ClientList /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/table-dashboard"
        element={
          isAuthenticated() ? (
            <TableDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/invite-user"
        element={
          isAuthenticated() ? <InviteUser /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated() ? <Users /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated() ? <Profile /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/shift" element={<Shift />} />
      <Route
        path="/create-shift"
        element={
          isAuthenticated() ? <CreateShift /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/edit-shift/:id"
        element={
          isAuthenticated() ? <EditShift /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/monthly-reservations"
        element={
          isAuthenticated() ? (
            <MonthlyReservation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/edit-user/:id"
        element={
          isAuthenticated() ? <EditUser /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/ingredient"
        element={
          isAuthenticated() ? <Ingredient /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/supplier"
        element={
          isAuthenticated() ? <Supplier /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/user-profile"
        element={
          isAuthenticated() ? <UserProfile /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/edit-profile"
        element={
          isAuthenticated() ? (
            <EditMyProfile />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/monthly-reservations"
        element={
          isAuthenticated() ? (
            <MonthlyReservation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
        <Route
        path="/ingredients"
        element={
          isAuthenticated() ? (
            <IngredientsTable />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
        <Route
        path="/edit-ingredient/:id"
        element={
          isAuthenticated() ? (
            <EditIngredientForm />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
    
  );
};

export default App;
