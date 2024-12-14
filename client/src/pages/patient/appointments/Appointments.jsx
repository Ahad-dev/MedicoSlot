import { SearchBar } from "@/components/common";
import Header from "@/components/common/Header";
import MyAppointments from "@/components/patients/MyAppointments";
import { Button } from "@/components/ui/button";
import { getUncommingAppointments } from "@/services/Patient";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderComponent } from "@/components/common/Loader";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUncommingAppointments().then((data) => {
      setAppointments(data);
      setFilteredAppointments(data); // Initially, show all data
      setLoading(false);
    });
  }, []);

  console.log(appointments);

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
    <div className="space-y-5">
      <Header label="Appointments" />
      <SearchBar handleSearch={handleSearch} />
      <div className="grid grid-cols-2 gap-5">
        <div className="flex justify-end">
          <Button className="max-w-48" variants="link">
            <Link to="/patient/add-appointment">Add Appointments</Link>
          </Button>
        </div>
      </div>
      {loading ? (
        <LoaderComponent />
      ) : (
        <MyAppointments appointments={filteredAppointments} />
      )}
    </div>
  );
};

export default Appointments;
