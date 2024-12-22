const { Patient, Doctor } = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Token = require("../models/token.model");
const Report = require("../models/report_model");

const getBasicInfo = async (req, res) => {
  const user = req?.user;

  return res.status(200).json({ success: true, user });
};

const getUncommingAppointments = async (req, res) => {
  try {
    const { _id: id } = req.user;
    // Find the appointments directly from the Appointment model
    console.log("Patient ID:", id);
    //find patient and populate appointments and doctor fields and dcotor field is in the appointment model
    const patient = await Patient.findOne({ patient_id: id }).populate({
      path: "appointments", // Populate appointments
      populate: [
        {
          path: "doctor",
          populate: { path: "doctor_id", select: "fullName" },
        }, // Populate doctor details
        { path: "token", select: "date time day time_slot" }, // Populate token details (if token is a reference)
      ],
    });

    console.log("Patient:", patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Filter out the upcoming appointments
    const upcomingAppointments = patient.appointments.filter(
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
      const { token, _id, doctor } = appointment;
      const { date, time_slot, day } = token; // Assuming token contains date, time, and day

      return {
        id: _id,
        doctorName: doctor.doctor_id.fullName, // From populated doctor field
        date: date.toDateString(), // Convert date to string
        time:time_slot,
        day,
        doctor
      };
    });

    console.log("Filtered appointments:", appointments);
    // Respond with the array of filtered appointments
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAppointmentHistory = async (req, res) => {
  try {
    const { _id: id } = req.user;
    // Find the appointments directly from the Appointment model
    console.log("Patient ID:", id);
    //find patient and populate appointments and doctor fields and dcotor field is in the appointment model
    const patient = await Patient.findOne({ patient_id: id }).populate({
      path: "appointments", // Populate appointments
      populate: [
        {
          path: "doctor",
          populate: { path: "doctor_id" },
        }, // Populate doctor details
        { path: "token", select: "date time day time_slot" }, // Populate token details (if token is a reference)
      ],
    });

    console.log("Patient:", patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointmentHistory = patient.appointments.filter(
      (appointment) => appointment.status === "Completed"
    );
    
    console.log("appointmentHistory: ", appointmentHistory);
    if (!appointmentHistory || appointmentHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments History found" });
    }

    // Extract the required details from each appointment
    const appointments = appointmentHistory.map((appointment) => {
      const { token, _id, doctor } = appointment;
      const { date, time_slot, day } = token; // Assuming token contains date, time, and day

      return {
        id: _id,
        doctorName: doctor.doctor_id.fullName, // From populated doctor field
        date: date.toDateString(), // Convert date to string
        time:time_slot,
        day,
        doctor,
      };
    });

    console.log("Filtered appointments:", appointments);
    // Respond with the array of filtered appointments
    res.status(200).json({ appointments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const bookAppointment = async (req, res) => {
  const { doctorId, day, time, date } = req.body;
  console.log({ doctorId, day, time, date });
  const { _id: patientId } = req?.user;
  try {

    const patient = await Patient.findOne({ patient_id: patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    //Book the appointment
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patient._id,
      status: "Pending",
    });

    await appointment.save();

    //create a token
    const token = new Token({
      appointment: appointment.id,
      day,
      time_slot: time,
      date,
    });
    await token.save();
    //create the report with create
    const report = new Report({
      appointment: appointment.id,
    });
    await report.save();

    //Add the token to appointment
    appointment.token = token.id;
    //Add the report to appointment
    appointment.report = report.id;
    await appointment.save();

    //Add the appointment to patient's appointments

    patient.appointments = [...patient.appointments, appointment.id];
    await patient.save();

    //Add the appointment to doctor's appointments
    const doctor = await Doctor.findById(doctorId);
    doctor.appointments = [...doctor.appointments, appointment.id];
    await doctor.save();

    return res.status(200).json({ success: true, appointment });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("doctor_id");
    return res.status(200).json({ success: true, doctors });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  const { doctorId } = req.params;
  console.log("Doctor ID:", doctorId);
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointments = await Appointment.find({ doctor: doctorId }).populate("token");
    return res.status(200).json({ success: true, appointments });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
const getAppointmentsById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Patient ID:", id);

    // Find the appointment by ID and populate related fields
    const appointment = await Appointment.findById(id)
      .populate({
        path: "doctor",
        populate: { path: "doctor_id", select: "fullName" }, // Populate doctor_id with fullName
      })
      .populate({
        path: "token",
        select: "date time day time_slot", // Populate token fields
      })
      .populate("report");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Extract appointment details
    const { token, _id, doctor,status,report } = appointment;

    // Check if `token` and `doctor` exist
    if (!token || !doctor || !doctor.doctor_id) {
      return res.status(404).json({ message: "Incomplete appointment details" });
    }

    const { date, time_slot, day } = token;

    // Construct the response object
    const result = {
      id: _id,
      doctorName: doctor.doctor_id.fullName, // Safely access populated fullName
      date: date.toDateString(), // Format date as a string
      time: time_slot,
      day,
      doctor,
      report,
      status
    };

    res.status(200).json({ appointment: result });
  } catch (err) {
    console.error("Error fetching appointment:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};



module.exports = {
  getBasicInfo,
  getUncommingAppointments,
  getAppointmentHistory,
  bookAppointment,
  getDoctors,
  getDoctorAppointments,
  getAppointmentsById,
};
