const express = require("express");
const {
  getBasicInfo,
  getAppointmentHistory,
  getUncommingAppointments,
  bookAppointment,
  getDoctors,
  getDoctorAppointments,
  getAppointmentsById,
} = require("../controllers/patientControllers");
const {PatientAuthMiddleware,authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/basicinfo", authMiddleware, getBasicInfo);
router.get("/upcomingappointments",authMiddleware, PatientAuthMiddleware, getUncommingAppointments);
router.get("/appointmenthistory",authMiddleware, PatientAuthMiddleware, getAppointmentHistory);
router.get("/doctors",authMiddleware, PatientAuthMiddleware, getDoctors);
router.post("/bookappointment",authMiddleware, PatientAuthMiddleware, bookAppointment);
router.get("/appointments/:doctorId",authMiddleware, PatientAuthMiddleware, getDoctorAppointments);
router.get("/appointment/:id",authMiddleware, PatientAuthMiddleware, getAppointmentsById);

module.exports = router;
