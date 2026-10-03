const express = require("express");
const profileControler = require("../controller/profile.controller");

const router = express.Router();

router.get("/get-me",profileControler.getMe);
router.put("/update-profile", profileControler.updateProfile);

module.exports = router;