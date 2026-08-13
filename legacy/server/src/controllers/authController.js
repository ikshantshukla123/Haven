import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import transporter from "../config/sendGrid.js"; // This is the change
import crypto from "crypto";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};





export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
});







export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }


  const adminExists = await User.findOne({ isAdmin: true });


  const verificationToken = crypto.randomBytes(20).toString("hex");

  console.log(`verification token: ${verificationToken}`)

  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
    isAdmin: false 
  });
  
  // Send verification email
  const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
  const mailOptions = { // Renamed from msg to mailOptions for clarity
    to: user.email,
    from: "ikshankshukla44@gmail.com",
    subject: "Email Verification",
    html: `<p>Hi ${user.name}, please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`,
  };

  try {
    // The send method is now on the transporter object
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "User registered. Verification email sent.",
    });
  } catch (error) {
    
    console.error("SendGrid email send error:", error);
   
    res.status(500).json({
      message: "User registered, but verification email failed to send. Please contact support.",
    });
  }
});




export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});







export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});