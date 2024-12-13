const { Patient, Doctor } = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Token = require("../models/token.model");
const Report = require("../models/report_model");

const getBasicInfo = async (req, res) => {
  const user = req?.user;

  return res.status(200).json({ success: true, user });
};

const getUncommingAppointments = async (req, res) => {
  const { id } = req?.user;

  //First get the patient
  const patient = await Patient.findById(id).populate("appointments");
  //Now I have the patient with appointments populated
  //I can filter out appointments where status is pending
  const uncommingAppointments = patient.appointments.filter(
    (appointment) => appointment.status === "Pending"
  );
  //Now I have uncommingAppointments

  return res.status(200).json({ success: true, uncommingAppointments });
};

const getAppointmentHistory = async (req, res) => {
  const { id } = req?.user;
  try {
    //First get the patient
    const patient = await Patient.findById(id).populate("appointments");
    //Now I have the patient with appointments populated
    //I can filter out appointments where status is completed
    const appointmentHistory = patient.appointments.filter(
      (appointment) => appointment.status === "Completed"
    );
    //Now I have appointmentHistory

    return res.status(200).json({ success: true, appointmentHistory });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const bookAppointment = async (req, res) => {
  const { doctorId, day, time } = req.body;
  const { _id: patientId } = req?.user;
  console.log(req?.user._id);
  try {
    //Book the appointment
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      status: "Pending",
    });

    await appointment.save();

    //create a token
    const token = new Token({
      appointment: appointment.id,
      day,
      time_slot: time,
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
    console.log(patientId);
    let patient = await Patient.findOne({patient_id:patientId});

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
    const doctors = await Doctor.find().populate('doctor_id');
    return res.status(200).json({ success: true, doctors });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getBasicInfo,
  getUncommingAppointments,
  getAppointmentHistory,
  bookAppointment,
  getDoctors,
};
