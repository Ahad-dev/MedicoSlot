"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUser } from "@/services/admin";
import { toast } from "sonner";
import { set } from "date-fns";
import { LoaderComponent } from "@/components/common/Loader";

const AddUser = () => {
  const [role, setRole] = useState("Patient"); // Default role
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    CNIC: "",
    password: "",
    specialization: "",
    experience: "",
    role:role,
    availability: true,
    availability_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
    available_timeslots: ["9:00 AM - 12:00 PM", "12:00 PM - 4:00 PM"],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    

    console.log("Form Data Submitted:", formData);
    setLoading(true);
    createUser(formData)
        .then((data) => {
            console.log(data);
            toast.success("User created successfully.");
            // Redirect to manage users page
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            // Show error message
        });
    setLoading(false);
    // reset form data
    setFormData({
        fullName: "",
        age: "",
        CNIC: "",
        password: "",
        specialization: "",
        experience: "",
        availability: true,
        availability_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        available_timeslots: ["9:00 AM - 12:00 PM", "12:00 PM - 4:00 PM"],
        });


    // Submit formData to backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
        </div>

        {/* CNIC */}
        <div>
          <Label htmlFor="CNIC">CNIC</Label>
          <Input
            id="CNIC"
            value={formData.CNIC}
            onChange={(e) => handleInputChange("CNIC", e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>

        {/* Role Selection */}
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value);
              handleInputChange("role", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Patient">Patient</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Fields */}
        {role === "Doctor" && (
          <>
            {/* Specialization */}
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
              />
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
              />
            </div>

            {/* Availability Days */}
            <div>
              <Label htmlFor="availability_days">Availability Days</Label>
              <Input
                id="availability_days"
                value={formData.availability_days.join(", ")}
                onChange={(e) =>
                  handleInputChange("availability_days", e.target.value.split(",").map((day) => day.trim()))
                }
              />
            </div>

            {/* Available Timeslots */}
            <div>
              <Label htmlFor="available_timeslots">Available Timeslots</Label>
              <Input
                id="available_timeslots"
                value={formData.available_timeslots.join(", ")}
                onChange={(e) =>
                  handleInputChange("available_timeslots", e.target.value.split(",").map((slot) => slot.trim()))
                }
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {!loading?<Button  onClick={handleSubmit}>Add User</Button>:<LoaderComponent></LoaderComponent>}
      </CardFooter>
    </Card>
  );
};

export default AddUser;
