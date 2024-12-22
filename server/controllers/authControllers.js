const { User ,Patient, Doctor} = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createTokenAndSetCookie } = require("../lib/token");

const patientRegister = async (req, res) => {
  const { fullName, CNIC, password } = req.body;
  try {
    let user = await User.findOne({ CNIC });

    //check if the user already exist
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      CNIC,
      password: hashedPassword,
    });
    //create a patient
    const patient = new Patient({
      patient_id: user._id,
    });
    await patient.save();

    //create the token and set the cookie
    const token = createTokenAndSetCookie(res, {
      id: user._id,
      fullName: user.fullName,
      CNIC: user.CNIC,
    });


    //send the response
    res
      .status(200)
      .json({ success: true, token, message: "User Registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error in Register ${error.message}` });
  }
};

const login = async (req, res) => {
  const { CNIC, password } = req.body;
  try {
    //check if the user exist
    const user = await User.findOne({ CNIC });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid CNIC" });
    }

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    //create the token and set the cookie
    const token = createTokenAndSetCookie(res, {
      id: user._id,
      fullName: user.fullName,
      CNIC: user.CNIC,
      role:user.role
    }); 

    //send the response
    res
      .status(200)
      .json({ success: true, token, message: "User Logged In Successfully",user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error in Login ${error.message}` });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "User Logged Out Successfully" });
}


const doctorRegister = async (req, res) => {
  const { fullName, CNIC, password, specialization,experience } = req.body;
  try {
    let user = await User.findOne({ CNIC });
    console.log(user);

    //check if the user already exist
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      CNIC,
      password: hashedPassword,
      role: "Doctor",
    });

    //create a doctor
    const doctor = new Doctor({
      doctor_id: user._id,
      specialization,
      experience
    });

    await doctor.save();

    //create the token and set the cookie
    const token = createTokenAndSetCookie(res, {
      id: user._id,
      fullName: user.fullName,
      CNIC: user.CNIC,
      specialization: user.specialization,
    });

    //send the response
    res
      .status(200)
      .json({ success: true, token, message: "User Registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error in Register ${error.message}` });
  }
}

module.exports = {
  doctorRegister,
  patientRegister,
  login,
  logout
};
