import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const AppointmentModal = ({user}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-teal-800 hover:bg-teal-600">Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="p-4">
            <p className="text-lg font-semibold">Name: {user.fullName}</p>
            <p className="text-lg font-semibold">CNIC: {user.CNIC}</p>
            <p className="text-lg font-semibold">Role: {user.role}</p>
        </div>
        <div className="flex justify-end p-4">
          <DialogClose>
            <Button>Close User Details</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal