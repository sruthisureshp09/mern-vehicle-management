import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  deleted: false, // Indicates whether the vehicle was successfully deleted
  error: null,
};

const deleteVehicleSlice = createSlice({
  name: 'deleteVehicle',
  initialState,
  reducers: {
    deleteVehicleReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteVehicleSuccess: (state) => {
      state.loading = false;
      state.deleted = true; // Mark the vehicle as deleted
      state.error = null;
    },
    deleteVehicleFail: (state, action) => {
      state.loading = false;
      state.deleted = false; // Vehicle deletion failed
      state.error = action.payload;
    },
    resetDeleteVehicle: (state) => {
      // Reset the deleted state to prepare for the next deletion
      state.deleted = false;
    },
  },
});

export const {
  deleteVehicleReq,
  deleteVehicleSuccess,
  deleteVehicleFail,
  resetDeleteVehicle,
} = deleteVehicleSlice.actions;

export default deleteVehicleSlice.reducer;
