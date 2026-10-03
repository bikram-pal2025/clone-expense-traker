const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const sessionModel = require("../models/session.model");

const crypto = require("crypto");
const sendMail = require("../services/email.service");
const { generateOTP, getOTPHtml } = require("../utils/utils");
const otpModel = require("../models/otp.model");

// ===================== REGISTER =====================

const registerUser = async (req, res) => {
  try {
    const { name, email, password, status,gender,number,dateOfBirth } = req.body;

    // Check if user already exists
    const isUserAlreadyExists = await userModel.findOne({ email,});

    if (isUserAlreadyExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      status,
      role: "user",
      gender,
      number,
      dateOfBirth,
       deleteAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Generate OTP
    const otp = generateOTP();

    // Create OTP email HTML
    const html = getOTPHtml(otp);

    // Hash OTP before saving in database
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Save OTP
    await otpModel.create({
      email,
      user: user._id,
      otpHash,
      otpExpireIn: new Date(Date.now() + 2 * 60 * 1000),
    });

    // Send OTP email
    await sendMail(email, "OTP Verification", `Your OTP is ${otp}`, html);

    //delete unverified user after 10 mnit

  

    // Registration completed, but email is not verified yet
    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
      user: {
        name: user.name,
        email: user.email,
        status: user.status,
        gender:user.gender,
        number:user.number,
        dateOfBirth:user.dateOfBirth,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.log(error);
   
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===================== LOGIN =====================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found. Please register first.",
      });
    }

    if (user.verified == false) {
      return res.status(400).json({
        success: false,
        message: "user not verified",
      });
    }

    // session check

    // Hash entered password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Check password
    const isPasswordValid = hashedPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create new refresh token
    const refreshToken = jwt.sign(
      {
        id: user._id,

        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Create NEW session for this login/device
    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      revoked: false,
    });

    // Create access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
    accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





// ===================== REFRESH TOKEN =====================

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const session = await sessionModel.findOne({
      refreshTokenHash: refreshTokenHash,

      revoked: false,
    });

    if (!session) {
      return res.status(400).json({
        message: "invalid refress token",
      });
    }

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id, role: decoded.role },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;

    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,

      secure: true,

      sameSite: "None",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,

      message: "Access token refreshed successfully",

      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,

      message: "Invalid or expired refresh token",
    });
  }
};

// ===================== LOGOUT =====================

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh token not found in one",
    });
  }

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOneAndDelete({
    refreshTokenHash,
  });

  if (!session) {
    return res.status(400).json({
      message: "refresh token not found ",
    });
  }

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "logout sucessfull",
  });
};

const logoutAll = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Check refresh token
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find current session
    const session = await sessionModel.findOne({
      refreshTokenHash,
    });

    // Check session
    if (!session) {
      return res.status(400).json({
        success: false,
        message: "Session not found",
      });
    }

    // Delete all sessions of this user
    await sessionModel.deleteMany({
      user: session.user,
    });

    // Clear current refresh token cookie
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ========================= verify email ==========================

const verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const otpDoc = await otpModel.findOne({
      email,
      otpHash,
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Change verified from false to true
    // Remove the automatic deletion time
    const user = await userModel.findByIdAndUpdate(
      otpDoc.user,
      {
        verified: true,
         resetPasswordAllowed: true,
        deleteAt: null,
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete used OTP
    await otpModel.deleteMany({
      user: otpDoc.user,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("Email:", email);
    console.log("OTP:", otp);

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    console.log("Generated OTP Hash:", otpHash);
    console.log("Current Time:", new Date());

    const otpDoc = await otpModel.findOne({
      email,
      otpHash,
      otpExpireIn: {
        $gt: new Date(),
      },
    });

    console.log("OTP DOCUMENT:", otpDoc);

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await otpModel.deleteMany({
      user: otpDoc.user,
    });

    await userModel.findOneAndUpdate(
      { email },
      { resetPasswordAllowed: true }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      userId: otpDoc.user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, email } = req.body;

    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    // Find user
    const user = await userModel.findOne({
      email,
      verified: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash old password
    const oldPasswordHash = crypto
      .createHash("sha256")
      .update(oldPassword)
      .digest("hex");

    // Check old password
    if (user.password !== oldPasswordHash) {
      return res.status(400).json({
        success: false,
        message: "Old password doesn't match",
      });
    }

    // Hash new password
    const newPasswordHash = crypto
      .createHash("sha256")
      .update(newPassword)
      .digest("hex");

    // Check if new password is same as old password
    if (newPasswordHash === user.password) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }

    // Update password
    const updateUser = await userModel.findOneAndUpdate(
      { email },
      {
        password: newPasswordHash,
      },
      {
        new: true,
      },
    );

    // Logout from all devices
    await sessionModel.deleteMany({
      user: user._id,
    });

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      user: {
        email: updateUser.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgetPassword = async (req, res) => {
try{
    const { email } = req.body;

  const user = await userModel.findOne({ email, verified: true });

  if (!user) {
    return res.status(404).json({
      success:false,
      message: "user not found register first",
    });
  }

  const otp = generateOTP();
  const html = getOTPHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpModel.create({
    email,
    otpHash,
    otpExpireIn: new Date(Date.now() + 2 * 60 * 1000),
  });

  await sendMail(
    email,
    "otp verifaction for reset password",
    `your otp  is ${otp}`,
    html,
  );

    

  return res.status(200).json({
    success:true,
    message: "password reset otp send to your email",
  });
} catch(err){
 console.log(err)
  
 return res.status(500).json({
  error: err.message,
  success: false,
  message: "Internal Server Error",
});
}
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await userModel.findOne({
    email,
    verified: true,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  const isVerified = await userModel.findOne({
    email,
    resetPasswordAllowed: true,
  });

  if (!isVerified) {
    return res.status(400).json({
      success: false,
      message: "otp not verified ",
    });
  }

  const newPasswordHash = crypto
    .createHash("sha256")
    .update(newPassword)
    .digest("hex");

  await userModel.findOneAndUpdate(
    { email, verified: true },
    { password: newPasswordHash },
  );

  await userModel.findOneAndUpdate({ email }, { resetPasswordAllowed: false });

  await sessionModel.deleteMany({
    email: email,
  });

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "password reset sucessFully",
  });
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, register first",
      });
    }

    const otp = generateOTP();

    const html = getOTPHtml(otp);

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await otpModel.create({
      email,
      user: user._id,
      otpHash,
      otpExpireIn: new Date(Date.now() + 1 * 60 * 1000),
    });

    await sendMail(email, "OTP Verification", `Your new OTP is ${otp}`, html);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,

  loginUser,



  refreshToken,

  logout,

  logoutAll,
  verifyEmail,
  changePassword,
  forgetPassword,
  verifyForgotPasswordOTP,
  resetPassword,
  resendOtp,
};
