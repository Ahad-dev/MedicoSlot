const { Doctor, User,Patient } = require("../models/user.model");
const  Appointment  = require("../models/appointment.model");
const bcrypt = require("bcryptjs");

// Create User Controller
const createUser = async (req, res) => {
  try {
    const { fullName, age, CNIC, password, role, specialization, experience, availability, availability_days, available_timeslots } = req.body;

    // Validate required fields
    if (!fullName || !CNIC || !password || !role) {
      return res.status(400).json({ message: "Full Name, CNIC, Password, and Role are required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create User
    const newUser = new User({
      fullName,
      age,
      CNIC,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    // Create additional role-specific data
    if (role === "Patient") {
      const patientData = new Patient({
        patient_id: savedUser._id,
        appointments: [],
      });
      await patientData.save();
    } else if (role === "Doctor") {
      if (!specialization || !experience) {
        return res.status(400).json({ message: "Specialization and Experience are required for Doctor." });
      }
      const doctorData = new Doctor({
        doctor_id: savedUser._id,
        specialization,
        experience,
        availability: availability ?? true, // Default true
        availability_days: availability_days ?? ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        available_timeslots: available_timeslots ?? ["9:00 AM - 12:00 PM", "12:00 PM - 4:00 PM"],
      });
      await doctorData.save();
    }

    res.status(201).json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = { createUser };


const createPatient = async (req, res) => {
  const { fullName, CNIC, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullName, CNIC, role, password: hashedPassword });
  await user.save();
  res.json({ success: true, user, message: "Patient created successfully" });
}

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, users });
}

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  await
  User.findByIdAndDelete(userId);
  res.json({ success: true, message: "User deleted successfully" });
}

const getBasicInfo = async (req, res) => {
  const admins = await User.find({ role: "admin" });

}

const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate([
   { path: "doctor",
    populate:[ { path: "doctor_id", select: "fullName" }]},
    {path: "patient",
    populate: [{ path: "patient_id", select: "fullName" }]}
  ]);
  res.json({ success: true, appointments });
}

const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findOne({doctor_id:id});
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ success: true, doctor });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  }catch(err){
    return res.status(500).json({ success: false, message: err.message });
  }
}



const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, age, password, role, specialization, experience, availability_days, available_timeslots } = req.body;
    console.log(req.body);
    console.log(fullName, age, password, role)
    // Update User
    const user = await User.findById(userId)
    console.log(user);
    user.fullName = fullName;
    user.age = age;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.role = role;
    await user.save();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update Role-Specific Data
    if (role === "Doctor") {
      await Doctor.findOneAndUpdate(
        { doctor_id: userId },
        { specialization, experience, availability_days, available_timeslots },
        { new: true, upsert: true }
      );
    } else if (role === "Patient") {
      // Patients generally don't have additional updates; can add logic here if needed.
    }

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};



module.exports = {
    createPatient,getAllUsers,deleteUser,updateUser,
    getBasicInfo,
    getAllAppointments,
    createUser,
    getDoctorById,
    getUserById,
    updateUser,
};