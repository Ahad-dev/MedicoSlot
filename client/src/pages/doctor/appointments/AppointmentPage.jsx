import { LoaderComponent } from "@/components/common/Loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getUncommingAppointments } from "@/services/doctor";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointmentes, setAppointmentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUncommingAppointments().then((appointments) => {
      console.log("Raw Appointments:", appointments); // Debugging

      // Sort appointments by date and time
      if(appointments){

        const sortedAppointments = appointments
            .map((appointment) => {
              const startTime = appointment.time.split(" - ")[0]; // Extract start time
              const dateTimeString = `${appointment.date} ${startTime}`;
              const parsedDateTime = moment(dateTimeString, "ddd MMM DD YYYY h:mm A");

              return {
                ...appointment,
                parsedDateTime, // Attach parsed date-time for sorting
              };
            })
            .filter((appointment) => appointment.parsedDateTime.isValid()) // Keep valid dates
            .sort((a, b) => a.parsedDateTime - b.parsedDateTime); // Sort by parsed date-time

          console.log("Sorted Appointments:", sortedAppointments); // Debugging
          setAppointmentes(sortedAppointments);  
      }
      setLoading(false);
    });
  }, []);


  return loading ? (
    <LoaderComponent />
  ) : (
    appointmentes.length == 0? <div className="text-center text-2xl text-gray-500">No Appointments</div> :
    <div className="flex flex-wrap gap-5 w-full">
      {appointmentes && appointmentes.map((appointment, index) => (
        <Card
          key={index}
          className="w-[350px] flex flex-col hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <div className="flex flex-col">
            <CardContent className="flex gap-3 mt-5">
              <h2 className="font-semibold ">ID:</h2>
              <p>{appointment.id}</p>
            </CardContent>
            <CardContent className="flex gap-3">
              <h2 className="font-semibold ">Name: </h2>
              <p>{appointment.patientName}</p>
            </CardContent>
            <CardContent className="flex gap-3">
              <h2 className="font-semibold ">Time:</h2>
              <p>{appointment.time}</p>
            </CardContent>
            <CardContent className="flex gap-3">
              <h2 className="font-semibold ">Date:</h2>
              <p>{appointment.date}</p>
            </CardContent>
          </div>
         {/* I want only the first appointment button is working */}
          <CardFooter className="flex w-full">
            <Button
              className="w-full bg-Primary-dark-blue hover:bg-blue-500"
              disabled={index !== 0}
            >
              <Link to={`/doctor/appointment/checkUp/${appointment.id}`}>Check up</Link>
            </Button>
          </CardFooter>

        </Card>

      ))}
    </div>
  );
};

export default DoctorAppointments;
