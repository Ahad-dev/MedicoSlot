import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({handleSearch}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

    
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input onChange ={handleChange} id="input-26" className="peer pe-9 ps-9 py-7 rounded-lg bg-gray-400/20  shadow-sm" placeholder="Search..." type="search" />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
