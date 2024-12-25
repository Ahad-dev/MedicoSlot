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
  getAppointmentsById,
} = require("../controllers/adminControllers");
const { authMiddleware, AdminAuthMiddleware } = require("../middlewares/authMiddleware");


router.get("/basicInfo",authMiddleware,AdminAuthMiddleware, getBasicInfo);
router.post("/createUser",authMiddleware,AdminAuthMiddleware, createUser);
router.post("/create-patient",authMiddleware,AdminAuthMiddleware, createPatient);
router.get("/get_all_users",authMiddleware,AdminAuthMiddleware, getAllUsers);
router.get("/get_all_appointments", authMiddleware,AdminAuthMiddleware,getAllAppointments);
router.get("/appointment/:id",authMiddleware, AdminAuthMiddleware, getAppointmentsById);
router.post("/delete_user",authMiddleware,AdminAuthMiddleware, deleteUser);
router.post("/update_user/:userId",authMiddleware,AdminAuthMiddleware, updateUser);
router.get("/doctor/:id",authMiddleware,AdminAuthMiddleware, getDoctorById);
router.get("/user/:id",authMiddleware,AdminAuthMiddleware, getUserById);

module.exports = router;
