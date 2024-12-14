const uncommingAppointments = [
    {
        id: 1,
        doctorName: "John Doe",
        date: "12/12/2021",
        time: "12:00 PM",
    },
    {
        id: 2,
        doctorName: "Jane Smith",
        date: "15/12/2021",
        time: "2:30 PM",
    },
    {
        id: 3,
        doctorName: "Michael Brown",
        date: "18/12/2021",
        time: "10:00 AM",
    },
    {
        id: 4,
        doctorName: "Emily Johnson",
        date: "20/12/2021",
        time: "3:45 PM",
    },
    {
        id: 5,
        doctorName: "Chris Wilson",
        date: "22/12/2021",
        time: "5:15 PM",
    },
];

export const getData = ()=>{
    // TODO: Call the API
    return uncommingAppointments;
}   
// const API_URL = "https://medico-slot.vercel.app";
const API_URL = import.meta.env.VITE_SERVER_URL;

import axios from 'axios';

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

export const getBasicInfo = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/patient/basicinfo`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};