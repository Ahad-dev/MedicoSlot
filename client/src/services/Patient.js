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

export const getDoctors = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/patient/doctors`);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const bookAppointment = async (appointmentData)=>{
    try{
        const response = await apiClient.post(`${API_URL}/api/patient/bookappointment`, appointmentData);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const getUncommingAppointments = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/patient/upcomingappointments`);
        console.log('Response Data:', response.data);
        return response.data.appointments;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const getAppointmentHistory = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/patient/appointmenthistory`);
        console.log('Response Data:', response.data);
        return response.data.appointments;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}