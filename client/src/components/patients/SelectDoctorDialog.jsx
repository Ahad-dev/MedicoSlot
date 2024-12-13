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
import { useDoctors } from "@/hooks/useDoctors";

const SelectDoctorDialog = ({buttonLabel}) => {
    const { doctors,loading } = useDoctors();
    const {tempSelectedDoctor,setSelectedDoctor} = useContext(CreateSelectedDoctor)

  return (
     loading ? <p>Loading...</p> :
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
            <DoctorHoverCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
        {tempSelectedDoctor && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p className="text-lg font-semibold">
              Selected Doctor: {tempSelectedDoctor.doctor_id.fullName}
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
