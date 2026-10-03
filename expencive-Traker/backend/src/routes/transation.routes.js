const express = require("express");
const transationController = require("../controller/transation.controller");
const userMiddelware = require("../middleware/userVerify.middleware");

const router = express.Router();


// Api end point

router.post("/create-transation",  userMiddelware.verifyUser,transationController.crateTransation )
router.get("/get-transation",  userMiddelware.verifyUser,transationController.getTransactions )
router.delete("/deleteone-transation/:id",  userMiddelware.verifyUser,transationController.deleteOneTransation )
router.get("/summary",userMiddelware.verifyUser,transationController.summary)



module.exports = router;