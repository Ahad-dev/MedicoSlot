import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { AddAppointmentSchema } from "@/schemas/patient";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useTransition } from "react";
import { LoaderComponent } from "../common/Loader";
import { Header } from "../common";
import SelectDoctorDialog from "./SelectDoctorDialog";
import { CreateSelectedDoctor } from "@/context/CreateSelectedDoctor";
import SelectTimeSlotDrawer from "./SelectTimeSlotDrawer";
import { Link } from "react-router-dom";
import { SelectedTimeSlot } from "@/context/SelectedTimeSlot";

const AddAppointmentForm = () => {
  const { selectedDoctor } = useContext(CreateSelectedDoctor);
  const {selectedTimeSlot} = useContext(SelectedTimeSlot)
  const [isPending, starTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(AddAppointmentSchema),
    defaultValues: {
      name: "Ahad",
      CNIC: "",
      purpose: "",
      age:null,
      doctorName: selectedDoctor?.doctorName,
      specialization: selectedDoctor?.specialization,
      description: selectedDoctor?.description,
      time:selectedTimeSlot?.time ,
      day:selectedTimeSlot?.day ,
      tokenId:selectedTimeSlot?.id
    },
  });

  const { reset } = form;
  useEffect(() => {
    if (selectedDoctor) {
      //TODO: this is only dummy data later when we stup backend we get while data from there

      reset({
        ...form.getValues(),
        doctorName: selectedDoctor?.doctorName,
        specialization: selectedDoctor?.specialization,
        description: selectedDoctor?.description,
      });
    }
    if(selectedTimeSlot){
      //TODO: this is only dummy data later when we stup backend we get while data from there
      reset({
        ...form.getValues(),
        time:selectedTimeSlot.time || selectedTimeSlot,
        day:selectedTimeSlot.day || "Tuesday",
        tokenId:selectedTimeSlot.id || "4654ds6af54as6d54f65ds"
      })
    }
  }, [selectedDoctor, reset, form,selectedTimeSlot]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
    <Button className = "mb-5" variant = "destructive" ><Link to="/patient/dashboard"> Go back home </Link></Button>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20" >
        <Header label={"Basic Info"} />
        <div className="grid grid-cols-2 gap-5 mb-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="text"
                    placeholder="John Doe"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="CNIC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNIC</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="number"
                    placeholder="331525884457"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="string"
                    placeholder="Dental"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="number"
                    placeholder="20"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <Header label={"Doctors Info"} />
        <div className="grid grid-cols-2 gap-5 mb-10 justify-center items-center">
          {!selectedDoctor ? (
            <>
              <Button className = "p-5 w-[fit-content] m-auto" >Automatic Select Doctor for you</Button>
              <SelectDoctorDialog buttonLabel={"Select Doctor"} />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <SelectDoctorDialog buttonLabel="Change Doctor" />
            </>
          )}
        </div>
        {selectedDoctor &&
        <>
          <Header label={"Time Slot Info"} />
          <div className="grid grid-cols-2 gap-5 mb-10 justify-center items-center">
            {
              !selectedTimeSlot?
              <>
              <Button className = "p-5 w-[fit-content] m-auto" >Automatic Select Time Slot</Button>
              <SelectTimeSlotDrawer buttonLabel="Select Time Slot"/>
              </>
              :
              <>
                
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="tokenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                        {...field}
                        type="text"
                        placeholder="John Doe"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <SelectTimeSlotDrawer buttonLabel="Change Time Slot" />
              </>
            }
          </div>
        </>
        }

        <Button type="submit" disabled={isPending} className="float-right">
          {isPending ? <LoaderComponent /> : "Book Apppointment"}
        </Button>
      </form>
    </Form>
    </>

  );
};

export default AddAppointmentForm;
