const { Doctor } = require("../models/user.model");
const Appointment = require("../models/appointment.model");

const getBasicInfo = (req, res) => {
  const user = req.user;

  return res.status(200).json({ success: true, user });
};

const getUpcomingAppointments = async (req, res) => {
  try {
    const { _id: doctorId } = req.user; // Assuming req.user contains the authenticated doctor's ID
    console.log("Doctor ID:", doctorId);

    // Find the doctor and populate their appointments
    const doctor = await Doctor.findOne({ doctor_id: doctorId }).populate({
      path: "appointments",
      populate: [
        {
          path:"patient",
          populate:{"path":"patient_id",select:"fullName"}
        },
        {
          path:"token",
        }
      ]
    });

    console.log("Doctor:", doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Filter out the upcoming appointments for the doctor
    const upcomingAppointments = doctor.appointments.filter(
      (appointment) => appointment.status === "Pending"
    );

    console.log("Upcoming appointments:", upcomingAppointments);
    if (!upcomingAppointments || upcomingAppointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No upcoming appointments found" });
    }

    // Extract the required details from each appointment
    const appointments = upcomingAppointments.map((appointment) => {
      const { token, _id, patient } = appointment;
      const { date, time_slot, day } = token; // Assuming token contains date, time, and day

      return {
        id: _id,
        patientName: patient.patient_id.fullName, // Patient's name from populated data
        patient,
        date: date.toDateString(), // Convert date to string
        time: time_slot,
        day,
      };
    });

    console.log("Filtered appointments:", appointments);
    // Respond with the array of filtered appointments
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching upcoming appointments for doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getAppointmentHistory = async (req, res) => {
  try {
    const { _id: doctorId } = req.user; // Assuming req.user contains the authenticated doctor's ID
    console.log("Doctor ID:", doctorId);

    // Find the doctor and populate their appointments
    const doctor = await Doctor.findOne({ doctor_id: doctorId }).populate({
      path: "appointments",
      populate: [
        {
          path:"patient",
          populate:{"path":"patient_id",select:"fullName"}
        },
        {
          path:"token",
        }
      ]
    });

    console.log("Doctor:", doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Filter out the upcoming appointments for the doctor
    const appointmentsHistory = doctor.appointments.filter(
      (appointment) => appointment.status === "Completed"
    );

    if (!appointmentsHistory || appointmentsHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments History found" });
    }

    // Extract the required details from each appointment
    const appointments = appointmentsHistory.map((appointment) => {
      const { token, _id, patient } = appointment;
      const { date, time_slot, day } = token; // Assuming token contains date, time, and day

      return {
        id: _id,
        patientName: patient.patient_id.fullName, // Patient's name from populated data
        patient,
        date: date.toDateString(), // Convert date to string
        time: time_slot,
        day,
      };
    });

    console.log("Filtered appointments:", appointments);
    // Respond with the array of filtered appointments
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching upcoming appointments for doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeCheckup = async (req, res) => {
  const { appointmentId, prescription } = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId).populate(
      "report"
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    appointment.report.prescription = prescription;
    appointment.status = "Completed";
    await appointment.save();
    return res
      .status(200)
      .json({ success: true, message: "Checkup completed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const goForAnotherCheckup = async (req, res) => {
  const { appointmentId, newTime, Date, prescription } = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId).populate(
      "report"
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    appointment.report.prescription = prescription;
    appointment.time = newTime;
    appointment.date = Date;
    appointment.status = "Pending";

    await appointment.save();
    return res
      .status(200)
      .json({ success: true, message: "Checkup rescheduled successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBasicInfo,
  getUpcomingAppointments,
  getAppointmentHistory,
  completeCheckup,
  goForAnotherCheckup,
};
