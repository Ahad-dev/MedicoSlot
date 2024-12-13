//useDoctor hook to fetch all doctors from the database
import { useEffect, useState } from "react";
import { getDoctors } from "../services/Patient";

export const useDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDoctors = async () => {
        const data = await getDoctors();
        if (data?.success) {
            setDoctors(data.doctors);
        }
        setLoading(false);
        };
        fetchDoctors();
    }, []);
    
    return { doctors, loading };
    }