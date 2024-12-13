import { 
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,
    DrawerFooter
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { getTimeSlot } from "@/data/patient/Appointments";
import { SelectedTimeSlot } from "@/context/SelectedTimeSlot";
import { CreateSelectedDoctor } from "@/context/CreateSelectedDoctor";

const SelectTimeSlotDrawer = ({buttonLabel}) => {
    const {tempSelectedTimeSlot,setTempSelectedTimeSlot,setSelectedTimeSlot} = useContext(SelectedTimeSlot);
    const {selectedDoctor} = useContext(CreateSelectedDoctor);
    const [day,setDay] = useState('');

    const timeSlots = getTimeSlot(selectedDoctor.available_timeslots,selectedDoctor.specialization)

    const handleSlotSelection = (slot) => {
        setTempSelectedTimeSlot(slot);
    };

    const handleConfirm = () => {
        if (tempSelectedTimeSlot) {
            setSelectedTimeSlot({time:tempSelectedTimeSlot,day});
            console.log("Confirmed Time Slot:", tempSelectedTimeSlot);
        }
    };

    return (
        <Drawer >
            {/* Drawer Trigger */}
            <DrawerTrigger>
                <span className="cursor-pointer p-3 bg-[#0f172a] text-white rounded-lg">
                    {buttonLabel}
                </span>
            </DrawerTrigger>

            {/* Drawer Content */}
            <DrawerContent className="px-10">
                <DrawerHeader>
                    <DrawerTitle>{buttonLabel}</DrawerTitle>
                    <DrawerDescription>
                        Please select a time slot for your appointment.
                    </DrawerDescription>
                </DrawerHeader>

                {/* Time Slot Buttons */}
                <div className=" flex gap-10 mt-4 ">
                    <div className="space-y-4">
                    {selectedDoctor.availability_days.map((dayI, index) => (
                        <Button
                        
                            key={dayI}
                            onClick={() => setDay(dayI)}
                            className={`w-full ${
                                day === dayI ? "bg-blue-500 text-white" : ""
                            }`}
                        >
                            {dayI}
                        </Button>
                    ))}
                    </div>
                    <div className="w-full flex flex-wrap gap-4">

                    {day && timeSlots.map((slot, index) => (
                        <Button
                            key={index}
                            onClick={() => handleSlotSelection(slot)}
                            className={`bg-white text-black border border-black/20 hover:bg-slate-400/50 hover:text-gray-800 hover:border-transparent ${
                                tempSelectedTimeSlot === slot ? "bg-blue-500 text-white" : ""
                            }`}
                        >
                            {slot}
                        </Button>
                    ))}
                    </div>

                </div>

                {/* Footer */}
                <DrawerFooter className="mt-6 flex justify-end gap-4">
                    <DrawerClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button 
                            disabled={!tempSelectedTimeSlot} 
                            onClick={handleConfirm} 
                            className="bg-green-500 text-white"
                        >
                            Confirm
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SelectTimeSlotDrawer;
