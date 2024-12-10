import React from 'react'
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import PatientLayout from '@/pages/patient/PatientLayout'
import { Dashboard,Appointments, AppointmentsHistory, Settings, AddAppointment } from '@/pages/patient'
import Home from '@/pages/home/Home'
import AddAppointmentLayout from '@/pages/patient/add-appointment/AddAppointmentLayout'
import Login from '@/pages/Auth/Login'


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>} />
        <Route element ={<PatientLayout/>}>
            <Route path='/patient/dashboard' element={<Dashboard/>}></Route>
            <Route path='/patient/appointments' element={<Appointments/>}></Route>
            <Route path='/patient/appointments-history' element={<AppointmentsHistory/>}></Route>
            <Route path='/patient/appointment/:id' element={<h1>A</h1>}></Route>
            <Route path='/patient/settings' element={<Settings/>}></Route>
        </Route>
        <Route element = {<AddAppointmentLayout/>}>
          <Route path="/patient/add-appointment" element={<AddAppointment/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
