const Appointments = [
  {
    id: "1",
    doctorName: "John Doe",
    purpose: "Cardiologist",
    date: Date.now(),
    time: "12:00 PM",
  },
  {
    id: "2",
    doctorName: "Jane Doe",
    purpose: "Dentist",
    date: Date.now(),
    time: "12:00 PM",
  },
  {
    id: "3",
    doctorName: "John Doe",
    purpose: "Cardiologist",
    date: Date.now(),
    time: "12:00 PM",
  },
  {
    id: "4",
    doctorName: "Jane Doe",
    purpose: "Dentist",
    date: Date.now(),
    time: "12:00 PM",
  },
  {
    id: "5",
    doctorName: "John Doe",
    purpose: "Cardiologist",
    date: Date.now(),
    time: "12:00 PM",
  },
  {
    id: "6",
    doctorName: "Jane Doe",
    purpose: "Dentist",
    date: Date.now(),
    time: "12:00 PM",
  },
];

export const getAppointments = () => {
  //TODO : API to get apointments
  return Appointments;
};
import moment from "moment";
import { getAllAppointments } from "@/services/Patient";

export const getTimeSlot = async (
  availableTimeSlots,
  specialization,
  doctorId,
  selectedDate
) => {
  // Fetch all appointments for the doctor
  const appointments = await getAllAppointments(doctorId);

  // Filter appointments for the selected date
  const dateAppointments = appointments.filter((appointment) => {
    const appointmentDate = moment(appointment.token.date, "YYYY-MM-DD")
      .add(1, "day") // Temporary adjustment for date mismatch
      .format("YYYY-MM-DD");

    const selectedFormattedDate = moment(selectedDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );

    console.log("Appointment Date:", appointmentDate);
    console.log("Selected Date:", selectedFormattedDate);

    return appointmentDate === selectedFormattedDate;
  });

  console.log("Filtered Appointments for Selected Date:", dateAppointments);

  // Define the time required per patient for each specialization
  const specializationTime = {
    Cardiologist: 25, // minutes per patient
    Dermatologist: 20,
    General: 15,
    Orthopedist: 30,
  };

  const timePerPatient = specializationTime[specialization] || 30; // Default to 30 mins if specialization not found

  const splitTimeSlots = [];
  console.log("All Appointments:", availableTimeSlots);

  // Generate time slots
  availableTimeSlots.forEach((slot) => {
    const [startTime, endTime] = slot.split(" - "); // Split the time range
    let start = moment(startTime, "h:mm A"); // Parse start time
    const end = moment(endTime, "h:mm A"); // Parse end time

    while (start.isBefore(end)) {
      const nextSlot = start.clone().add(timePerPatient, "minutes");

      if (nextSlot.isAfter(end)) break; // Stop if the next slot exceeds the end time

      const formattedSlot = `${start.format("h:mm A")} - ${nextSlot.format(
        "h:mm A"
      )}`;

      // Check for conflicts with existing appointments
      const isSlotAvailable = !dateAppointments.some((appointment) => {
        const [apptStartTime, apptEndTime] = appointment.token.time_slot.split(" - ");
        const appointmentStart = moment(apptStartTime, "h:mm A");
        const appointmentEnd = moment(apptEndTime, "h:mm A");

        // Check if time slots overlap
        return (
          start.isBetween(appointmentStart, appointmentEnd, null, "[)") || // Start overlaps
          nextSlot.isBetween(appointmentStart, appointmentEnd, null, "(]") || // End overlaps
          appointmentStart.isBetween(start, nextSlot, null, "[)") // Appointment starts within the current slot
        );
      });

      if (isSlotAvailable) {
        splitTimeSlots.push(formattedSlot);
      }

      start = nextSlot; // Move to the next slot
    }
  });

  console.log("Available Time Slots:", splitTimeSlots);

  return splitTimeSlots;
};

