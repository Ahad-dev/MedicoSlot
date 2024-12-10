// import Button from "../common/Button"
import { Button } from "../ui/button"
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader

} from "../ui/card"

const AppointmentCard = ({appointment}) => {
  return (
    <Card className = "w-[350px] flex flex-col hover:border-green-400 transition-all duration-200 hover:shadow-lg hover:scale-105">
        <div className="flex flex-col">
            <CardContent className = "flex gap-3 mt-5">
                <h2 className="font-semibold ">ID:</h2>
                <p>{appointment.id}</p>
            </CardContent>
            <CardContent className = "flex gap-3">
                <h2 className="font-semibold ">Name: </h2>
                <p>{appointment.doctorName}</p>
            </CardContent>
            <CardContent className = "flex gap-3">
                <h2 className="font-semibold ">Purpose:</h2>
                <p>{appointment.purpose}</p>
            </CardContent>
            <CardContent className = "flex gap-3">
                <h2 className="font-semibold ">Date</h2>
                <p>{appointment.date}</p>
            </CardContent>
        </div>

      <CardFooter className="flex w-full">
            <Button
                className="w-full bg-Primary-dark-Green hover:bg-green-500"

            >
                Details
            </Button>
      </CardFooter>
    </Card>
  )
}

export default AppointmentCard
