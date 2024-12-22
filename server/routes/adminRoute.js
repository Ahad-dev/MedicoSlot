const express = require("express");
const router = express.Router();

const {
  createUser,
  createPatient,
  getAllUsers,
  deleteUser,
  updateUser,
  getBasicInfo,
  getAllAppointments,
  getDoctorById,
  getUserById,
} = require("../controllers/adminControllers");


router.get("/basicInfo", getBasicInfo);
router.post("/createUser", createUser);
router.post("/create-patient", createPatient);
router.get("/get_all_users", getAllUsers);
router.get("/get_all_appointments", getAllAppointments);
router.post("/delete_user", deleteUser);
router.post("/update_user/:userId", updateUser);
router.get("/doctor/:id", getDoctorById);
router.get("/user/:id", getUserById);

module.exports = router;
