import { SearchBar } from '@/components/common'
import Header from '@/components/common/Header'
import FilterOptions from '@/components/patients/FilterOptions'
import MyAppointments from '@/components/patients/MyAppointments'
import { Button } from '@/components/ui/button'
import { getAppointments } from '@/data/patient/Appointments'
import { Link } from 'react-router-dom'

const Appointments = () => {

  const appointments = getAppointments()
  

  return (
    <div className='space-y-5'>
      <Header label="Appointments" />
      <SearchBar data={appointments}/>
      <div className=' grid grid-cols-2 gap-5'>
        <FilterOptions/>
        <div className='flex justify-end'>
        <Button className=" max-w-48" variants="link"><Link to="/patient/add-appointment">
          Add Appointments
        </Link></Button>
        </div>
      </div>
      <MyAppointments appointments = {appointments}/>
    </div>
  )
}

export default Appointments
