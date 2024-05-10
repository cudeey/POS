import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice";
import apiUserReducer from "./slices/apiUserSlice";
import apiReservationReducer from "./slices/addReservation";
import apiDeleteReservationReducer from "./slices/deleteReservation";
import apiEditReservationReducer from "./slices/editReservation";
import apiGetReservationReducer from "./slices/getReservation";
import apiEditReservationSliceReducer from "./slices/editReservationSlice";
import apiGetReservationByIdReducer from "./slices/getReservation";
import apiRecipesReducer from "./slices/apiRecipes";
import apiGetShiftReducer from "./slices/getShift";
import apiShiftReducer from "./slices/addShift";
import apiEditShiftReducer from "./slices/editShift";
import apiGetIngredientsReducer from "./slices/getIngredients";
import apiGetSuppliersReducer from "./slices/getSupplier";
import apiIngredientReducer from "./slices/addIngredient";
import apiSupplierReducer from "./slices/addSupplier";
import apiFilterReducer from "./slices/filterSlice";
import apiTablesReducer from "./slices/apiTables";
import reservationDataReducer from "./slices/getReservationData";

const store = configureStore({
  reducer: {
    user: userReducer,
    apiUser: apiUserReducer,
    apiReservation: apiReservationReducer,
    apiDeleteReservation: apiDeleteReservationReducer,
    apiEditReservation: apiEditReservationReducer,
    apiGetReservation: apiGetReservationReducer,
    apiEdit: apiEditReservationSliceReducer,
    apiGetReservationById: apiGetReservationByIdReducer,
    apiRecipes: apiRecipesReducer,
    apiGetShift: apiGetShiftReducer,
    apiShift: apiShiftReducer,
    apiEditShift: apiEditShiftReducer,
    apiGetIngredients: apiGetIngredientsReducer,
    apiGetSuppliers: apiGetSuppliersReducer,
    apiIngredient: apiIngredientReducer,
    apiSupplier: apiSupplierReducer,
    filter: apiFilterReducer,
    apiTables: apiTablesReducer,
    reservation: reservationDataReducer,
  },
});

export default store;
