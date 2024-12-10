
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



const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
];

export const getTimeSlot = ()=>{
    //TODO : we pass the Id of particular Doctor for which we wat the Time slots
    return timeSlots;
}