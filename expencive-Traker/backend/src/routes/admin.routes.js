const express = require ("express");
const adminController = require ("../controller/admin.controller");
const middleware = require ("../middleware/auth.middelware");
const router = express.Router();

 
// Api end point for admin 

router.post("/login",adminController.loginAdmin )
router.get("/logout",adminController.logoutAdmin )
router.get("/admin-status", middleware.verifyAdminToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin is logged in",
  });
});



module.exports = router