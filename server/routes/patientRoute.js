const express = require("express");
const {
  getBasicInfo,
  getAppointmentHistory,
  getUncommingAppointments,
  bookAppointment,
  getDoctors,
} = require("../controllers/patientControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/basicinfo", authMiddleware, getBasicInfo);
router.get("/upcomingappointments", authMiddleware, getUncommingAppointments);
router.get("/appointmenthistory", authMiddleware, getAppointmentHistory);
router.get("/doctors", authMiddleware, getDoctors);
router.post("/bookappointment", authMiddleware, bookAppointment);

module.exports = router;
