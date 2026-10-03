const express = require("express");
const authController = require("../controller/auth.controller");
const userMiddelware = require("../middleware/userVerify.middleware");

const router = express.Router();

//API end point
router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)

router.get("/logout",userMiddelware.verifyUser,authController.logout)
router.get("/logout-all-device",userMiddelware.verifyUser,authController.logoutAll)
router.get("/refreshToken",authController.refreshToken)
router.post("/verify-email",authController.verifyEmail)
router.patch("/change-password",userMiddelware.verifyUser,authController.changePassword)
router.post("/forget-password",authController.forgetPassword)
router.post("/verify-forgot-password-otp",authController.verifyForgotPasswordOTP)
router.post("/reset-password",authController.resetPassword)
router.post("/resend-otp",authController.resendOtp)
router.get("/user-check", userMiddelware.verifyUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "user is logged in",
  });
});




module.exports = router;