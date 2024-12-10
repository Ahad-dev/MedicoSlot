import { Navbar } from "@/components/common"
import { Outlet } from "react-router-dom"
import { CreateSelectedDoctorProvider } from '@/context/CreateSelectedDoctor';
import { SelectedTimeSlotProvider } from "@/context/SelectedTimeSlot";


const AddAppointmentLayout = () => {
  return (
    <CreateSelectedDoctorProvider>
      <SelectedTimeSlotProvider>
        <div>
          <Navbar/>
          <div className="mx-10 mt-10">
            <Outlet/>
          </div>
        </div>
      </SelectedTimeSlotProvider>
    </CreateSelectedDoctorProvider>
  )
}

export default AddAppointmentLayout
