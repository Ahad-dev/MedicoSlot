import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchComp({label}) {
  return (
    <div className="flex justify-between items-center gap-2 max-w-64">
        
      <Label className="font-semibold text-md text-gray-900/50">
        {label}
      </Label>
      <Switch id="switch-01" />
    </div>
  );
}
