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


export const getUncommingAppointments = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/doctor/upcomingappointments`);
        return response.data.appointments;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const getAppointmentHistory = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/doctor/appointmenthistory`);
        return response.data.appointments;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}


export const getDoctorSchedule = async ()=>{
    try{
        const response = await apiClient.get(`${API_URL}/api/doctor/schedule`);
        return response.data.schedule;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const saveDoctorSchedule = async (schedule)=>{
    console.log('Schedule:',schedule);
    try{
        const response = await apiClient.post(`${API_URL}/api/doctor/schedule`,schedule);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}