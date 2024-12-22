import { SearchBar } from '@/components/common';
import Header from '@/components/common/Header';
import { LoaderComponent } from '@/components/common/Loader';
import AppointmentHistoryTable from '@/components/patients/AppointmentHistoryTable';
import { getAppointmentHistory } from '@/services/Patient';
import { useEffect, useState } from 'react';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getAppointmentHistory().then((data) => {
        if (!data) {
          setLoading(false);
          return;
        }
        setAppointments(data);
        setFilteredAppointments(data); // Initially, show all data
        setLoading(false);
      });
    }, []);
  
    console.log(filteredAppointments);
  
    const handleSearch = (searchTerm) => {
      const lowerCaseTerm = searchTerm.trim().toLowerCase(); // Normalize search term
      if (lowerCaseTerm === '') {
        // If the search term is empty, reset to all appointments
        setFilteredAppointments(appointments);
        return;
      }
    
      const filtered = appointments.filter((appointment) => {
        // Check appointment properties
        return (
          appointment.id?.toLowerCase().includes(lowerCaseTerm) || // Match ID
          appointment.doctorName?.toLowerCase().includes(lowerCaseTerm) || // Match doctor's name
          appointment.doctor?.specialization
            ?.toLowerCase()
            .includes(lowerCaseTerm) || // Match specialization
          appointment.date?.toLowerCase().includes(lowerCaseTerm) // Match date
        );
      });
    
      setFilteredAppointments(filtered); // Update the state with filtered data
    };
  

  return (
    
    <div className="space-y-10">
      <Header label="Appointments" />
      <SearchBar handleSearch={handleSearch} />

      {!loading ? <AppointmentHistoryTable data={filteredAppointments} />:<LoaderComponent />}  
    </div>
  );
};

export default AppointmentHistory;
