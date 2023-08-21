import axiosLib from "axios";
import { API_BASE } from "constants/global";
import { LOCAL_STORAGE_KEYS } from "constants/localStorageKeys";

const axiosInstance = axiosLib.create({
	baseURL: API_BASE,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=utf-8",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
		config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(err) => Promise.reject(err),
);

export default axiosInstance;
