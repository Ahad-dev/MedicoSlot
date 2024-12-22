import React, { useEffect, useState } from 'react'
import { Routes,Route, useLocation} from 'react-router-dom'
import PatientLayout from '@/pages/patient/PatientLayout'
import { Dashboard,Appointments, AppointmentsHistory, Settings, AddAppointment, AppointmentDetails } from '@/pages/patient'
import Home from '@/pages/home/Home'
import AddAppointmentLayout from '@/pages/patient/add-appointment/AddAppointmentLayout'
import Login from '@/pages/Auth/Login'
import { AuthenticationContextProvider } from './context/AuthenticationContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoaderPage from './components/common/LoaderPage'
import DoctorLayout from './pages/doctor/DoctorLayout'
import { CheckUpPatient, DoctorAppointmentHistory, DoctorDashboard, ScheduleManagment } from './pages/doctor'
import DoctorAppointments from './pages/doctor/appointments/AppointmentPage'




const App = () => {
  // const [loading, setLoading] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   // Set loading to true when location changes (route change)
  //   setLoading(true);

  //   // Simulate loading time, then set loading to false after delay
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 800); // Adjust the delay as needed (e.g., fetching data, etc.)

  //   // Cleanup the timer when component unmounts or location changes
  //   return () => clearTimeout(timer);
  // }, [location]);

  
  return (
    // loading ? <LoaderPage></LoaderPage> :
    <AuthenticationContextProvider>
          <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>} />
          <Route element ={<ProtectedRoute><PatientLayout/></ProtectedRoute>}>
              <Route path='/patient/dashboard' element={<Dashboard/>}></Route>
              <Route path='/patient/appointments' element={<Appointments/>}></Route>
              <Route path='/patient/appointments-history' element={<AppointmentsHistory/>}></Route>
              <Route path='/patient/appointment/:id' element={<AppointmentDetails></AppointmentDetails>}></Route>
              <Route path='/patient/settings' element={<Settings/>}></Route>
          </Route>
          <Route element = {<ProtectedRoute><AddAppointmentLayout/></ProtectedRoute>}>
            <Route path="/patient/add-appointment" element={<AddAppointment/>}/>
          </Route>
          <Route element={<DoctorLayout/>}>
            <Route path='/doctor/dashboard' element={<DoctorDashboard/>}></Route>
            <Route path='/doctor/appointments' element={<DoctorAppointments/>}></Route>
            <Route path='/doctor/appointment/checkUp/:id' element={<CheckUpPatient/>}></Route>
            <Route path='/doctor/appointment/history' element={<DoctorAppointmentHistory/>}></Route>
            <Route path= "/doctor/schedule-management" element={<ScheduleManagment/>}></Route>
          </Route>
        </Routes>
    </AuthenticationContextProvider>

  )
}

export default App
