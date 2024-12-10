import { createContext, useState } from "react";

const SelectedTimeSlot = createContext();

const SelectedTimeSlotProvider = ({children})=>{
    const [selectedTimeSlot,setSelectedTimeSlot] = useState(null);
    const [tempSelectedTimeSlot,setTempSelectedTimeSlot] = useState(null);

    return(
        <SelectedTimeSlot.Provider value={{selectedTimeSlot,setSelectedTimeSlot,tempSelectedTimeSlot,setTempSelectedTimeSlot}}>
            {children}
        </SelectedTimeSlot.Provider>
    )

}

export {SelectedTimeSlot,SelectedTimeSlotProvider}