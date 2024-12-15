import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerFooter,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { Calendar } from "../ui/calendar";
import { getTimeSlot } from "@/data/patient/Appointments";
import { SelectedTimeSlot } from "@/context/SelectedTimeSlot";
import { CreateSelectedDoctor } from "@/context/CreateSelectedDoctor";

const SelectTimeSlotDrawer = ({ buttonLabel }) => {
  const { tempSelectedTimeSlot, setTempSelectedTimeSlot, setSelectedTimeSlot } =
    useContext(SelectedTimeSlot);
  const { selectedDoctor } = useContext(CreateSelectedDoctor);
  const [selectedDate, setSelectedDate] = useState(null); // Date selected by user
  const [day, setDay] = useState("");
  const [isValidDate, setIsValidDate] = useState(false); // Validation for availability
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(null);
  // Get time slots for the selected doctor

  // Handle time slots button click
  const handleTimeSlots = (date) => {
    const availableTimeSlots = selectedDoctor.available_timeslots;
    const specialization = selectedDoctor.specialization;
    const doctorId = selectedDoctor._id;

    getTimeSlot(availableTimeSlots, specialization, doctorId, date).then(
      (timeSlots) => {
        setSelectedTimeSlots(timeSlots);
      }
    );
  };

  // Helper to check if a date is selectable
  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure time is set to midnight
    if (date < today) return false; // Disable past dates

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return selectedDoctor.availability_days.includes(dayName); // Enable only available days
  };

  // Handle date selection and validation
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Get day name
    setDay(dayName);
    setIsValidDate(selectedDoctor.availability_days.includes(dayName)); // Check if available
    handleTimeSlots(date); // Fetch time slots
  };

  const handleSlotSelection = (slot) => {
    setTempSelectedTimeSlot(slot);
  };

  const handleConfirm = () => {
    if (tempSelectedTimeSlot && isValidDate) {
      setSelectedTimeSlot({
        time: tempSelectedTimeSlot,
        day,
        date: selectedDate,
      });
      console.log(
        "Confirmed Time Slot:",
        tempSelectedTimeSlot,
        "on",
        day,
        "at",
        selectedDate
      );
    }
  };

  return (
    <Drawer>
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
            Please select a date and time slot for your appointment.
          </DrawerDescription>
        </DrawerHeader>

        {/* Date Picker */}
        <div className="mt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            disabled={(date) => !isDateSelectable(date)} // Disable unselectable dates
            className="border rounded-md"
          />
          {!isValidDate && selectedDate && (
            <p className="text-red-500 mt-2">
              Selected date is not available. Please choose another date.
            </p>
          )}
        </div>

        {/* Time Slot Buttons */}
        {isValidDate && selectedTimeSlots && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-4">
              Available Time Slots for {day}:
            </p>
            <div className="w-full flex flex-wrap gap-4">
              {selectedTimeSlots.map((slot, index) => (
                <Button
                  key={index}
                  onClick={() => handleSlotSelection(slot)}
                  className={`bg-white text-black border border-black/20 hover:bg-slate-400/50 hover:text-gray-800 hover:border-transparent ${
                    tempSelectedTimeSlot === slot
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <DrawerFooter className="mt-6 flex justify-end gap-4">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              disabled={!tempSelectedTimeSlot || !isValidDate}
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
