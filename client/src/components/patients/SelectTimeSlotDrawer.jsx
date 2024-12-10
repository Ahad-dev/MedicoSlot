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
import { useContext } from "react";
import { getTimeSlot } from "@/data/patient/Appointments";
import { SelectedTimeSlot } from "@/context/SelectedTimeSlot";

const SelectTimeSlotDrawer = ({buttonLabel}) => {
    const {tempSelectedTimeSlot,setTempSelectedTimeSlot,setSelectedTimeSlot} = useContext(SelectedTimeSlot);

    const timeSlots = getTimeSlot()

    const handleSlotSelection = (slot) => {
        setTempSelectedTimeSlot(slot);
    };

    const handleConfirm = () => {
        if (tempSelectedTimeSlot) {
            setSelectedTimeSlot(tempSelectedTimeSlot)
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
                <div className="grid grid-cols-8 gap-4 mt-4">
                    {timeSlots.map((slot, index) => (
                        <Button
                            key={index}
                            onClick={() => handleSlotSelection(slot)}
                            className={`w-full ${
                                tempSelectedTimeSlot === slot ? "bg-blue-500 text-white" : ""
                            }`}
                        >
                            {slot}
                        </Button>
                    ))}
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
