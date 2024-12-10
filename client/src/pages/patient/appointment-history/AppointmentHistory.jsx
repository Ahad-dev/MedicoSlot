import { SearchBar } from '@/components/common'
import Header from '@/components/common/Header'
import FilterOptions from '@/components/patients/FilterOptions'
import { Button } from '@/components/ui/button'
import { getAppointments } from '@/data/patient/Appointments'
import Table from "@/components/common/Table"
import { appointmentHistoryColumns,  } from '@/data/patient/colums'
import AppointmentHistoryTable from '@/components/patients/AppointmentHistoryTable'

const AppointmentHistory = () => {

  const appointments = getAppointments()
  console.log(appointments)

  return (
    <div className='space-y-10'>
      <Header label="Appointments" />
      <SearchBar data={appointments}/>
      <div className=' grid grid-cols-2 gap-5'>
        <FilterOptions/>
      </div>
      <AppointmentHistoryTable data={appointments}/>
    </div>
  )
}

export default AppointmentHistory
