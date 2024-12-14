//axiox
import axios from 'axios'
axios.defaults.withCredentials = true;

export const login = async ({CNIC, password}) => {
    try{
        console.log(import.meta.env.VITE_SERVER_URL)
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {CNIC, password});
      
        // Access the response data
        console.log('Response Data:', response.data);

        // Example: Handle the response
        if (response.data.success) {
            console.log('Login successful:', response.data.message);
            console.log('Token:', response.data.token);
        } else {
            console.error('Login failed:', response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
    
}

export const logout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`);
        console.log('Response Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}