import { 
    Card,
    CardHeader,
    CardFooter,
    CardContent

} from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";

export const CardWrapper = ({
  children,
  headerLable,
  backButtonLabel,
  backButtonhref,
}) => {
  return <Card className="w-[400px] shadow-md">
    <CardHeader>
        <h1 className="text-3xl font-semibold">{headerLable}</h1>
    </CardHeader>
    <CardContent>
        {children}
    </CardContent>

    <CardFooter>
        <BackButton href={backButtonhref} label={backButtonLabel}></BackButton>
    </CardFooter>
  </Card>;
};
