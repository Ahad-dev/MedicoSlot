import React from 'react'
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import PatientLayout from '@/pages/patient/PatientLayout'
import { Dashboard,Appointments, AppointmentsHistory, Settings, AddAppointment } from '@/pages/patient'
import Home from '@/pages/home/Home'
import AddAppointmentLayout from '@/pages/patient/add-appointment/AddAppointmentLayout'
import Login from '@/pages/Auth/Login'
import { AuthenticationContextProvider } from './context/AuthenticationContext'
import ProtectedRoute from './components/common/ProtectedRoute'


const App = () => {
  return (
    <AuthenticationContextProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>} />
          <Route element ={<ProtectedRoute><PatientLayout/></ProtectedRoute>}>
              <Route path='/patient/dashboard' element={<Dashboard/>}></Route>
              <Route path='/patient/appointments' element={<Appointments/>}></Route>
              <Route path='/patient/appointments-history' element={<AppointmentsHistory/>}></Route>
              <Route path='/patient/appointment/:id' element={<h1>A</h1>}></Route>
              <Route path='/patient/settings' element={<Settings/>}></Route>
          </Route>
          <Route element = {<ProtectedRoute><AddAppointmentLayout/></ProtectedRoute>}>
            <Route path="/patient/add-appointment" element={<AddAppointment/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthenticationContextProvider>

  )
}

export default App
