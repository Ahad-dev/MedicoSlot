const { Doctor } = require("../models/user.model");
const Appointment = require("../models/appointment.model");

const getBasicInfo = (req, res) => {
  const user = req.user;

  return res.status(200).json({ success: true, user });
};

const getUncommingAppointments = async (req, res) => {
  const { id } = req.user;

  try {
    const doctor = await Doctor.findById(id).populate("appointments");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const uncommingAppointments = doctor.appointments.filter(
      (appointment) => appointment.status === "Pending"
    );

    if (uncommingAppointments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No uncomming appointments found" });
    }

    return res.status(200).json({ success: true, uncommingAppointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAppointmentHistory = async (req, res) => {
  const { id } = req.user;
  try {
    const doctor = await Doctor.findById(id).populate("appointments");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const appointmentHistory = doctor.appointments.filter(
      (appointment) => appointment.status === "Completed"
    );

    if (appointmentHistory.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No appointment history found" });
    }

    return res.status(200).json({ success: true, appointmentHistory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
  getUncommingAppointments,
  getAppointmentHistory,
  completeCheckup,
  goForAnotherCheckup,
};
