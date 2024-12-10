import { Header } from "../common"
import { Button } from "../ui/button"
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "../ui/card"


const DeleteAccount = () => {
  return (
    <Card className="bg-red-500/40 shadow-red-500/30 shadow-lg">
        <CardHeader>
            <p className="text-red-500 font-semibold">Delete Account</p>
        </CardHeader>
        <CardContent>
            <p className="text-gray-700">To Delete your account fully all the intfomation related to your appointments and feedback has been deleted</p>
        </CardContent>
        <CardFooter>
            <Button className="text-white bg-red-500 hover:bg-red-400 w-full py-5"> Delete Account</Button>
        </CardFooter>
    </Card>
  )
}

export default DeleteAccount
