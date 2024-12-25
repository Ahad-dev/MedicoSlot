import axios from "axios";
import { getDoctors } from "./Patient";

// const API_URL = "https://medico-slot.vercel.app";
const API_URL = import.meta.env.VITE_SERVER_URL;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token'); // Fetch token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const getAllUsers = async () => {
    try {
        const response = await apiClient.get("/api/admin/get_all_users");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllAppointments = async () => {
    try {
        const response = await apiClient.get("/api/admin/get_all_appointments");
        return response.data.appointments;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (userData) => {
    console.log("Creating user:", userData);
    try {
        const response = await apiClient.post("/api/admin/createUser", userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const getUserById = async (userId) => {
    console.log("Fetching user with ID:", userId);
    try {
        const response = await apiClient.get(`/api/admin/user/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getDoctorById = async (doctorId) => {
    try {
        const response = await apiClient.get(`/api/admin/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await apiClient.post(`/api/admin/update_user/${userId}`,{ ...updatedData });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.post("/api/admin/delete_user", { userId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const getAppointmentsById = async (appointmentId) => {
    try {
        const response = await apiClient.get(`/api/admin/appointment/${appointmentId}`);
        return response.data.appointment;
    } catch (error) {
        console.error(error);
    }
}