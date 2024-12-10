import React, { useState,useContext } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";

import DoctorHoverCard from "./DoctorHoverCard";
import { CreateSelectedDoctor } from "@/context/CreateSelectedDoctor";

const doctors = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    specialization: "Cardiologist",
    image: "https://via.placeholder.com/50",
    description: "Dr. John Doe has over 10 years of experience in cardiology.",
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    specialization: "Dermatologist",
    image: "https://via.placeholder.com/50",
    description: "Dr. Jane Smith is an expert in skin care and dermatology.",
  },
  // Add more doctors as needed
];

const SelectDoctorDialog = ({buttonLabel}) => {

    const {tempSelectedDoctor,setSelectedDoctor} = useContext(CreateSelectedDoctor)

  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer p-3  bg-[#0f172a] text-white rounded-lg">{buttonLabel}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{buttonLabel}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <DoctorHoverCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        {tempSelectedDoctor && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p className="text-lg font-semibold">
              Selected Doctor: {tempSelectedDoctor.doctorName}
            </p>
            <p>{tempSelectedDoctor.specialization}</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
            <DialogClose>
                <Button onClick = {()=>setSelectedDoctor(tempSelectedDoctor)}>{buttonLabel}</Button>
            </DialogClose>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectDoctorDialog;
