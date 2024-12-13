import React from "react";
import DoctorCard from "./DoctorCard";

import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatMonthYear } from "@/lib/utils";

const DoctorHoverCard = ({ doctor }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <DoctorCard doctor={doctor} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 border bg-white shadow-lg">
        {/* Check if doctor data is passed */}
        {doctor ? (
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={doctor.image || ""} />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm">{doctor.description || "No description available"}</p>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Joined {formatMonthYear(doctor.doctor_id.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm">Doctor information is unavailable</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default DoctorHoverCard;
