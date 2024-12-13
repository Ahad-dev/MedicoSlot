const { Doctor, User } = require("../models/user.model");

const createDoctor = async (req, res) => {
  const {
    fullName,
    CNIC,
    role,
    password,
    specialization,
    experience,
    availability_days,
    available_timeslots,
  } = req.body;
  const user = new User({ fullName, CNIC, role, password });
  await user.save();
  const doctor = new Doctor({
    doctor_id: user._id,
    specialization,
    experience,
    availability_days,
    available_timeslots,
    appointments: [],
  });
  await doctor.save();
  res.json({ success: true, doctor, message: "Doctor created successfully" });
};


module.exports = {
    createDoctor,
};