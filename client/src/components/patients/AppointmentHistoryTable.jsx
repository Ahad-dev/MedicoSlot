import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AppointmentHistoryTable = ({ data }) => {
  console.log(data);

  return (
    data ? <div className="text-center text-2xl text-gray-500">No Appointments</div> :
    <table className="w-full overflow-hidden rounded-lg shadow-lg">
      <thead>
        <tr>
          {Object.keys(data[0]).map((head) => (
            <th className="p-6 bg-green-500 text-white">
              {head.toUpperCase()}
            </th>
          ))}
          <th className="p-6 bg-green-500 text-white">
              Details
            </th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((item) => (
          <tr className="text-gray-500 hover:bg-gray-400/10">
            <td className="py-6 text-center">{item.id}</td>
            <td className="py-6 text-center">{item.doctorName}</td>
            <td className="py-6 text-center">{item.purpose}</td>
            <td className="py-6 text-center">{item.date}</td>
            <td className="py-6 text-center">{item.time}</td>
            <td className="py-6 text-center">
                <Button variants="link" className="bg-green-500 hover:bg-green-400">
                    <Link to={`/patient/appointment/${item.id}`}>
                        Details
                    </Link>
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentHistoryTable;
