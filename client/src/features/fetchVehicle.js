// Import necessary libraries and dependencies
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  vehicleDetails: null,
  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    fetchVehicleReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVehicleSuccess: (state, action) => {
      state.loading = false;
      state.vehicleDetails = action.payload;
      state.error = null;
    },
    fetchVehicleFail: (state, action) => {
      state.loading = false;
      state.vehicleDetails = null;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVehicleReq,
  fetchVehicleSuccess,
  fetchVehicleFail,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
