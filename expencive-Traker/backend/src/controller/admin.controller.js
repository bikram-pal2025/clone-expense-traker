const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }



    const findUser = await adminModel.findOne({
      userName: userName.trim(),
    });

  

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (passwordHash !== findUser.password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const refreshToken = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});




    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      refreshToken,
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


async function logoutAdmin(req, res) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}



module.exports = { loginAdmin ,logoutAdmin};