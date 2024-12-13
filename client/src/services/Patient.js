import axios from "axios";

axios.defaults.withCredentials = true;

export const getDoctors = async ()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/patient/doctors`);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const bookAppointment = async (appointmentData)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/patient/bookappointment`, appointmentData);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}