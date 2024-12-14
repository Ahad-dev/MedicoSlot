//axiox
import axios from 'axios'

// const API_URL = "https://medico-slot.vercel.app";
const API_URL = import.meta.env.VITE_SERVER_URL;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token'); // Fetch token
    console.log({token})
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async ({CNIC, password}) => {
    try{
        console.log(API_URL)
        const response = await apiClient.post(`${API_URL}/api/auth/login`, {CNIC, password});
      
        // Access the response data
        console.log('Response Data:', response.data);

        // Example: Handle the response
        if (response.data.success) {
            // console.log('Login successful:', response.data.message);
            // console.log('Token:', response.data.token);
            //set token in local storage
            localStorage.setItem('auth_token', response.data.token);

        } else {
            console.error('Login failed:', response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return error.response?.data || error.message;
    }
}