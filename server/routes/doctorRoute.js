const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getBasicInfo,
  getUncommingAppointments,
  getAppointmentHistory,
  goForAnotherCheckup,
  completeCheckup
} = require("../controllers/doctorControllers");

router.get("/basicinfo", authMiddleware, getBasicInfo);
router.get("/upcomingappointments", authMiddleware, getUncommingAppointments);
router.get("/appointmenthistory", authMiddleware, getAppointmentHistory);
router.post("/completecheckup", authMiddleware, completeCheckup);
router.post("/reschedulecheckup", authMiddleware, goForAnotherCheckup);


module.exports = router;