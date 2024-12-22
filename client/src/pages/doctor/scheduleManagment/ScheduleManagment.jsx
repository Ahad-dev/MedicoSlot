"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import moment from "moment";
import { getDoctorSchedule, saveDoctorSchedule } from "@/services/doctor";
import { convertTo12HourFormat } from "@/lib/utils";
import { toast } from "sonner";

const ScheduleManagement = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeRange, setTimeRange] = useState({ startTime: "", endTime: "" });
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    getDoctorSchedule()
      .then((res) => {
        const { days, timeSlots } = res || {};
        setSelectedDays(days || []);
        setTimeRange({
          startTime: convertTo12HourFormat(timeSlots?.startTime || "09:00"),
          endTime: convertTo12HourFormat(timeSlots?.endTime || "15:00"),
        });
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        toast.error("Failed to fetch schedule.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeChange = (type, time) => {
    setTimeRange((prev) => ({ ...prev, [type]: time }));
  };

  const validateSchedule = () => {
    if (selectedDays.length < 3) {
      toast.error("Please select at least 3 days.");
      return false;
    }

    const { startTime, endTime } = timeRange;
    if (!startTime || !endTime) {
      toast.error("Please select a valid time range.");
      return false;
    }

    const start = moment(startTime, "h:mmA");
    const end = moment(endTime, "h:mmA");
    const duration = moment.duration(end.diff(start)).asHours();
    console.log("Duration:", duration);
    if (duration < 6) {
      toast.error("The time range must be exactly 6 hours.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateSchedule()) {
      const formattedTimeRange = {
        startTime: moment(timeRange.startTime, "h:mmA").format("HH:mm"),
        endTime: moment(timeRange.endTime, "h:mmA").format("HH:mm"),
      };

      const schedule = selectedDays.map((day) => ({
        day,
        ...formattedTimeRange,
      }));

      saveDoctorSchedule({ days: selectedDays, timeSlots: formattedTimeRange })
        .then(() => toast.success("Schedule saved successfully."))
        .catch((error) => {
          console.error("Error saving schedule:", error);
          toast.error("Failed to save schedule.");
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Schedule Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label className="text-sm font-medium text-foreground">Time Range</Label>
          <div className="flex space-x-4 mt-2">
            <input
              type="time"
              value={moment(timeRange.startTime, "h:mmA").format("HH:mm")}
              onChange={(e) => handleTimeChange("startTime", moment(e.target.value, "HH:mm").format("h:mmA"))}
            />
            <input
              type="time"
              value={moment(timeRange.endTime, "h:mmA").format("HH:mm")}
              onChange={(e) => handleTimeChange("endTime", moment(e.target.value, "HH:mm").format("h:mmA"))}
            />
          </div>
        </div>
        <div>
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4 my-2">
              <Checkbox
                checked={selectedDays.includes(day)}
                onCheckedChange={() => handleDayToggle(day)}
                id={day}
              />
              <label htmlFor={day} className="text-sm font-medium">
                {day}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Loading..." : "Save Schedule"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleManagement;
