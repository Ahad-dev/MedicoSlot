import { useState,createContext } from "react";

const CreateSelectedDoctor = createContext()

const CreateSelectedDoctorProvider = ({children}) => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [tempSelectedDoctor, setTempSelectedDoctor] = useState(null);
    return (
        <CreateSelectedDoctor.Provider value={{selectedDoctor,setSelectedDoctor,tempSelectedDoctor, setTempSelectedDoctor}}>
            {children}
        </CreateSelectedDoctor.Provider>
    )
}

export {CreateSelectedDoctorProvider,CreateSelectedDoctor}