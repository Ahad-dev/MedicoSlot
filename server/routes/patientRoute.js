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
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/basicinfo", authMiddleware, getBasicInfo);
router.get("/upcomingappointments", authMiddleware, getUncommingAppointments);
router.get("/appointmenthistory", authMiddleware, getAppointmentHistory);
router.get("/doctors", authMiddleware, getDoctors);
router.post("/bookappointment", authMiddleware, bookAppointment);
router.get("/appointments/:doctorId", authMiddleware, getDoctorAppointments);
router.get("/appointment/:id", authMiddleware, getAppointmentsById);

module.exports = router;
