import * as z from "zod"


// Patient Login Schema
export const LoginSchema = z.object({
    CNIC: z.string().min(1, {
        message: "CNIC is required"
    }
    ),
    password: z.string().min(6),
})

// Add Appointment Schema
export const AddAppointmentSchema = z.object({
    name: z.string().min(3,{
        message:"Name must be at least 3 characters long"
    }),
    CNIC: z.string().min(13,{
        message:"CNIC must be at least 12 Number long"
    }),
    purpose:z.string().min(1),
    age: z.string(),
    doctorName:z.string(),
    specialization:z.string(),
    description:z.string(),
    time:z.string() ,
    day:z.string(),
    tokenId:z.string()
})
