import { Card, CardHeader, CardTitle } from "../ui/card";
import { CreateSelectedDoctor } from "@/context/CreateSelectedDoctor";
import { useContext } from "react";

const DoctorCard = ({ doctor }) => {
  const { tempSelectedDoctor,setTempSelectedDoctor } =
    useContext(CreateSelectedDoctor);
  return (
    <Card
      key={doctor.id}
      className={`hover:shadow-lg transition ${
        tempSelectedDoctor?.id === doctor.id ? "border border-blue-500" : ""
      }`}
      onClick={() => setTempSelectedDoctor(doctor)}
    >
      <CardHeader>
        <CardTitle>{doctor.doctorName}</CardTitle>
        <p className="text-sm text-gray-500">{doctor.specialization}</p>
      </CardHeader>
    </Card>
  );
};

export default DoctorCard;
