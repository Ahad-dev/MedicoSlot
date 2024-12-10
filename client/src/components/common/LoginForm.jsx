import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage,
    FormDescription,
    FormLabel
} from "../ui/form"

import { Input } from "../ui/input"

import { Button } from "../ui/button"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas/patient"
import { login } from "@/services/login"

import { useNavigate } from "react-router-dom"

const LoginForm = () => {

    const navigation = useNavigate();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            CNIC:"",
            password:""
        }
    })

    const handleSubmit = async(data) => {
        console.log(data);
        const result = await login(data);
        //if login is successful
        if(result.success){
            console.log("Login Successful")
        }
        //redirect to patient dashboard
        navigation('/patient/dashboard')

    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    type="text"
                    placeholder="331000656154"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="password"
                    placeholder="*********"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        <Button type="submit" className="bg-Primary-dark-Green text-white w-full p-5 rounded-none">Login</Button>
        </form>
    </Form>
  )
}

export default LoginForm