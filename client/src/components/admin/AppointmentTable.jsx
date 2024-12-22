import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AppointmentTable = ({ data }) => {
  return (
    !data ? <div className="text-center text-2xl text-gray-500">No Appointments</div> :
    <table className="w-full overflow-hidden rounded-lg shadow-lg">
      <thead>
        <tr>
            <th className="p-6 bg-teal-600 text-white">
              ID
            </th>
            <th className="p-6 bg-teal-600 text-white">
                Doctor Name
            </th>
            <th className="p-6 bg-teal-600 text-white">
              Patient Name
            </th>
            <th className="p-6 bg-teal-600 text-white">
              Status
            </th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((item) => (
          <tr className="text-gray-500 hover:bg-gray-400/10">
            <td className="py-6 text-center">{item._id}</td>
            <td className="py-6 text-center">{item.doctor.doctor_id.fullName}</td>
            <td className="py-6 text-center">{item.patient.patient_id.fullName}</td>
            <td className="py-6 text-center flex justify-center items-center">
                <div className={`flex justify-center border ${item.role =="Patient"?"border-green-500 text-green-600 bg-green-500/50":item.role=="Doctor"?"border-blue-500 text-blue-600 bg-blue-500/50":"border-teal-500 text-teal-600 bg-teal-500/50"} rounded-sm px-2 py-1 w-[fit-content]`}>

                {item.status}
                </div>
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
