import { MdSpaceDashboard } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { History } from "lucide-react";

export const PatientSideBarLinks = [
    {
        name: 'Dashboard',
        path:"/patient/dashboard",
        icon: MdSpaceDashboard

    },
    {
        name: 'Appointments',
        path:"/patient/appointments",
        icon: MdMedicalServices
    },
    {
        name:"Appointments Histroy",
        path:"/patient/appointments-history",
        icon: History
    },
    {
        name: 'Settings',
        path:"/patient/settings",
        icon: IoSettings
    }
]