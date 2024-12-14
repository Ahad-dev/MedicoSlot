import axios from "axios";

const API_URL = "https://medico-slot.vercel.app";

axios.defaults.withCredentials = true;

export const getDoctors = async ()=>{
    try{
        const response = await axios.get(`${API_URL}/api/patient/doctors`);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}

export const bookAppointment = async (appointmentData)=>{
    try{
        const response = await axios.post(`${API_URL}/api/patient/bookappointment`, appointmentData);
        console.log('Response Data:', response.data);
        return response.data;
    }catch(error){
        console.error('Error:', error.response?.data || error.message);
    }
}