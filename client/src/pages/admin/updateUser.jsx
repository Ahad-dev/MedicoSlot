import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { getDoctorById, getUserById, updateUser } from "@/services/admin";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateUserForm = () => {
    const { userId } = useParams();
    console.log(userId);
  const [user, setUser] = useState({});
  const [role, setRole] = useState("Patient");
  const [doctorFields, setDoctorFields] = useState({ specialization: "", experience: "", availability_days: [], available_timeslots: [] });

  // Fetch user details on load
  useEffect(() => {
        getUserById(userId).then((data) => {
            setUser(data.user);
            setRole(data.user.role);
            console.log(data);
            if (data.user.role === "Doctor") {
                getDoctorById(userId).then((doctorData) => {
                    setDoctorFields(doctorData.doctor);
                });
            }
        }).catch((error) => {  
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details.");
        });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
      const payload = {
        fullName: user.fullName,
        age: user.age,
        password: user.password,
        role,
        ...doctorFields,
      };

      updateUser(userId, payload).then((data) => {
        toast.success("User updated successfully.");
        console.log({data});
        // Redirect to manage users page
        }).catch((error) => {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full Name"
        value={user.fullName || ""}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
      />
      <Input
        placeholder="Age"
        type="number"
        value={user.age || ""}
        onChange={(e) => setUser({ ...user, age: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      {user.role === "Doctor" && (
        <>
          <Input
            placeholder="Specialization"
            value={doctorFields.specialization || ""}
            onChange={(e) => setDoctorFields({ ...doctorFields, specialization: e.target.value })}
          />
          <Input
            placeholder="Experience"
            value={doctorFields.experience || ""}
            onChange={(e) => setDoctorFields({ ...doctorFields, experience: e.target.value })}
          />
          <Input
            placeholder="Available Days (comma-separated)"
            value={doctorFields.availability_days.join(", ") || ""}
            onChange={(e) =>
              setDoctorFields({ ...doctorFields, availability_days: e.target.value.split(",").map((day) => day.trim()) })
            }
          />
          <Input
            placeholder="Available Time Slots (comma-separated)"
            value={doctorFields.available_timeslots.join(", ") || ""}
            onChange={(e) =>
              setDoctorFields({
                ...doctorFields,
                available_timeslots: e.target.value.split(",").map((slot) => slot.trim()),
              })
            }
          />
        </>
      )}

      <Button type="submit">Update User</Button>
    </form>
  );
};

export default UpdateUserForm;
