import { Navbar } from "@/components/common"
import { Outlet } from "react-router-dom"
import { CreateSelectedDoctorProvider } from '@/context/CreateSelectedDoctor';
import { SelectedTimeSlotProvider } from "@/context/SelectedTimeSlot";
import { Toaster } from "@/components/ui/sonner";


const AddAppointmentLayout = () => {
  return (
    <CreateSelectedDoctorProvider>
      <SelectedTimeSlotProvider>
        <div>
          <Navbar/>
          <div className="mx-10 mt-10">
            <Toaster
              position="top-right"
            />
            <Outlet/>
          </div>
        </div>
      </SelectedTimeSlotProvider>
    </CreateSelectedDoctorProvider>
  )
}

export default AddAppointmentLayout
