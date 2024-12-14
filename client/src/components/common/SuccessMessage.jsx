import { CheckCircle2 } from "lucide-react";

const SuccessMessage = ({success}) => {
    if (!success) {
        return null;
    }
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            {success}
        </div>
    );
}

export default SuccessMessage