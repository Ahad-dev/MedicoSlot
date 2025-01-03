import axios from "axios";

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

export const getAppoitmentsById = async (id)=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/patient/appointment/${id}`);
        return response.data.appointment;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const getDoctorAppoitmentsById = async (id)=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/doctor/appointment/${id}`);
        console.log(response.data.appointment)
        return response.data.appointment;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const completeCheckup = async (appointmentId, prescription) => {
    try {
        const response = await apiClient.post(`${API_URL}/api/doctor/completecheckup`, {
            appointmentId,
            prescription,
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
};