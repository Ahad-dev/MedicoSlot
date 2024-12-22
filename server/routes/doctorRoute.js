const express = require("express");
const router = express.Router();
const {DoctorAuthMiddleware,authMiddleware} = require("../middlewares/authMiddleware");
const {
  getBasicInfo,
  getUpcomingAppointments,
  getAppointmentHistory,
  goForAnotherCheckup,
  completeCheckup,
  getAppointmentById,
  getDoctorSchedule,
  saveDoctorSchedule
} = require("../controllers/doctorControllers");

router.get("/basicinfo",authMiddleware, DoctorAuthMiddleware, getBasicInfo);
router.get("/upcomingappointments",authMiddleware, DoctorAuthMiddleware, getUpcomingAppointments);
router.get("/appointmenthistory",authMiddleware, DoctorAuthMiddleware, getAppointmentHistory);
router.post("/completecheckup",authMiddleware, DoctorAuthMiddleware, completeCheckup);
router.post("/reschedulecheckup",authMiddleware, DoctorAuthMiddleware, goForAnotherCheckup);
router.get("/appointment/:id",authMiddleware, DoctorAuthMiddleware, getAppointmentById);
router.get("/schedule",authMiddleware, DoctorAuthMiddleware, getDoctorSchedule);
router.post("/schedule",authMiddleware, DoctorAuthMiddleware, saveDoctorSchedule);



module.exports = router;