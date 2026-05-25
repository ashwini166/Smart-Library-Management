const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ================= REGISTER =================

exports.registerUser = async (req, res) => {

  try {

    let { fullName, email, password, role } = req.body;

    fullName = fullName?.trim();

    email = email?.trim().toLowerCase();

    password = password?.trim();

    if (!fullName || !email || !password) {

      return res.status(400).json({
        success:false,
        message:"All fields are required"
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success:false,
        message:"User already exists"
      });

    }

    // Admin Protection

    if (role === "admin") {

      if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
      ) {

        return res.status(403).json({
          success:false,
          message:"Invalid admin credentials"
        });

      }

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({

      fullName,

      email,

      password: hashedPassword,

      role: role === "admin"
        ? "admin"
        : "user"

    });

    res.status(201).json({

      success:true,

      message:"Registration successful",

      token: generateToken(user._id),

      user:{
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role
      }

    });

  } catch(error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }

};

// ================= LOGIN =================

exports.loginUser = async (req,res)=>{

  try{

    let {email,password} = req.body;

    email = email?.trim().toLowerCase();

    password = password?.trim();

    if(!email || !password){

      return res.status(400).json({
        success:false,
        message:"Email and Password required"
      });

    }

    const user = await User.findOne({email});

    if(!user){

      return res.status(401).json({
        success:false,
        message:"Invalid Credentials"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res.status(401).json({
        success:false,
        message:"Invalid Credentials"
      });

    }

    const token = generateToken(user._id);

    res.status(200).json({

      success:true,

      message:"Login Successful",

      token,

      user:{
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role
      }

    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }

};