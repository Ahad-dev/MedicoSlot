
const Appointments = [
    {
        id: '1',
        doctorName: 'John Doe',
        purpose: 'Cardiologist',
        date: Date.now(),
        time: '12:00 PM'
    },
    {
        id: '2',
        doctorName: 'Jane Doe',
        purpose: 'Dentist',
        date: Date.now(),
        time: '12:00 PM'
    },
    {
        id: '3',
        doctorName: 'John Doe',
        purpose: 'Cardiologist',
        date: Date.now(),
        time: '12:00 PM'
    },
    {
        id: '4',
        doctorName: 'Jane Doe',
        purpose: 'Dentist',
        date: Date.now(),
        time: '12:00 PM'
    },
    {
        id: '5',
        doctorName: 'John Doe',
        purpose: 'Cardiologist',
        date: Date.now(),
        time: '12:00 PM'
    },
    {
        id: '6',
        doctorName: 'Jane Doe',
        purpose: 'Dentist',
        date: Date.now(),
        time: '12:00 PM'
    }
]

export const getAppointments = ()=>{
    //TODO : API to get apointments
    return Appointments
}



import moment from "moment";

export const getTimeSlot = (availableTimeSlots, specialization) => {
  // Define the time required per patient for each specialization
  const specializationTime = {
    Cardiologist: 25, // minutes per patient
    Dermatologist: 20,
    General: 15,
    Orthopedist: 30,
  };

  const timePerPatient = specializationTime[specialization] || 30; // Default to 30 mins if specialization not found

  const splitTimeSlots = [];

  availableTimeSlots.forEach((slot) => {
    const [startTime, endTime] = slot.split(" - "); // Split the time range
    let start = moment(startTime, "h:mm A"); // Parse start time
    const end = moment(endTime, "h:mm A"); // Parse end time

    while (start.isBefore(end)) {
      const nextSlot = start.clone().add(timePerPatient, "minutes");
      if (nextSlot.isAfter(end)) break; // Stop if the next slot exceeds the end time
      splitTimeSlots.push(`${start.format("h:mm A")} - ${nextSlot.format("h:mm A")}`);
      start = nextSlot; // Move to the next slot
    }
  });

  return splitTimeSlots;
};
