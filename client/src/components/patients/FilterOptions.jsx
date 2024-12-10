import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterOptions() {
  return (
    <div className="grid grid-cols-2 gap-2">
        <div
        className="space-y-2"
        // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
        style={{ "--ring": "234 89% 74%" }}
        >
        <Select defaultValue="s1">
            <SelectTrigger id="Sort By">
            <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="s1">Sort By</SelectItem>
            <SelectItem value="s2">Next.js</SelectItem>
            <SelectItem value="s3">Astro</SelectItem>
            <SelectItem value="s4">Gatsby</SelectItem>
            </SelectContent>
        </Select>
        </div>
        <div
        className="space-y-2"
        // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
        style={{ "--ring": "234 89% 74%" }}
        >
        <Select defaultValue="s1">
            <SelectTrigger id="select-19">
            <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="s1">Filter By</SelectItem>
            <SelectItem value="s2">Next.js</SelectItem>
            <SelectItem value="s3">Astro</SelectItem>
            <SelectItem value="s4">Gatsby</SelectItem>
            </SelectContent>
        </Select>
        </div>
    </div>

  );
}
