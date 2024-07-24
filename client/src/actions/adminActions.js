import { loginFail, loginReq, loginSuccess } from "../features/loginSlice";
import axiosConfig from "../config/axios";
import { registerFail, registerReq, registerSuccess } from "../features/registerSlice";
import { addVehicleFail, addVehicleReq, addVehicleSuccess } from "../features/addVehicle";
import { fetchVehiclesFail, fetchVehiclesReq, fetchVehiclesSuccess } from "../features/fetchVehicles";
import { fetchVehicleFail, fetchVehicleReq, fetchVehicleSuccess } from "../features/fetchVehicle";
import { deleteVehicleFail, deleteVehicleReq, deleteVehicleSuccess } from "../features/deleteVehicle";
import { messageFail, messageReq, messageSuccess } from "../features/messageSlice";

export const login = (email, password) => async (dispatch) => {
    try {

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        dispatch(loginReq());

        const { data } = await axiosConfig.post(
            `/login`,
            {
                email,
                password,
            },
            config
        );

        dispatch(loginSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(loginFail(errorIs));
    }
};



export const register = (email, password, name) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        dispatch(registerReq());

        const { data } = await axiosConfig.post(
            `/register`,
            {
                name,
                email,
                password,
            },
            config
        );


        dispatch(registerSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(registerFail(errorIs));
    }
};

export const addVehicle = (formData) => async (dispatch, getState) => {
    try {

        const userInfo = getState();
        console.log(userInfo.login.userInfo.token);

        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.login.userInfo.token}`,
            },
        };

        dispatch(addVehicleReq());

        const { data } = await axiosConfig.post('/addVehicle', formData, config);
        dispatch(addVehicleSuccess(data));

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(addVehicleFail(errorIs));
    }
};


export const fetchVehicles = () => async (dispatch, getState) => {
    try {
        const userInfo = getState();
        const token = userInfo.login.userInfo.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        dispatch(fetchVehiclesReq());

        // Make a GET request to your backend API to fetch vehicles
        const { data } = await axiosConfig.get('/getVehicles', config);

        dispatch(fetchVehiclesSuccess(data));
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(fetchVehiclesFail(errorIs));
    }
};


export const fetchVehicle = (vehicleId) => async (dispatch, getState) => {
    try {
        const userInfo = getState();
        const token = userInfo.login.userInfo.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        dispatch(fetchVehicleReq());

        // Make a GET request to your backend API to fetch the details of the individual vehicle
        const { data } = await axiosConfig.get(`/getVehicle/${vehicleId}`, config);

        dispatch(fetchVehicleSuccess(data));
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(fetchVehicleFail(errorIs));
    }
};

export const deleteVehicle = (vehicleId) => async (dispatch, getState) => {
    try {
        const userInfo = getState();
        const token = userInfo.login.userInfo.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        dispatch(deleteVehicleReq());

        // Make a DELETE request to your backend API to delete the vehicle
        await axiosConfig.delete(`/deleteVehicle/${vehicleId}`, config);

        dispatch(deleteVehicleSuccess());
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(deleteVehicleFail(errorIs));
    }
};



export const getLinkAction = (email) => async (dispatch) => {

    try {
        console.log("test");
        dispatch(messageReq())
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }

        const { data } = await axiosConfig.post("/get-link", { email }, config)
        dispatch(messageSuccess())
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        console.log(errorIs);
        dispatch(messageFail())
    }

}

export const resetPassword = (email, password) => async (dispatch) => {

    try {


        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const { data } = await axiosConfig.post("/reset-password", { email, password }, config)


        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

    }

}