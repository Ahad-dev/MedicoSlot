
import { Header } from "../common"
import SwitchComp from "../common/Switch"
import { 
    Card,
    CardContent,
    CardHeader
} from "../ui/card"

const Notifications = () => {
  return (
    <Card>
        <CardHeader>
            <Header label={"Notifications"}/>
        </CardHeader>
        <CardContent className = "grid grid-cols-2 gap-6    ">
            <SwitchComp label={"Reminders"}></SwitchComp>
            <SwitchComp label={"Notifications"}></SwitchComp>
        </CardContent>
    </Card>
  )
}

export default Notifications
