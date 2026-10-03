const express = require("express");
const adminMiddleWare = require("../middleware/auth.middelware");
const userMiddleware = require("../middleware/userVerify.middleware");
const categoryController = require("../controller/category.controller");

const router = express.Router();

 
 router.post("/post-category",adminMiddleWare.verifyAdminToken,categoryController.postCatagory)
 router.get("/get-category-admin", adminMiddleWare.verifyAdminToken ,categoryController.getCategory)
 router.get("/get-category-user", userMiddleware.verifyUser,categoryController.getCategory)
 router.delete("/delete-category/:id", adminMiddleWare.verifyAdminToken, categoryController.deleteCategory)
 router.put("/update-category/:id",adminMiddleWare.verifyAdminToken,categoryController.updateCategory)



module.exports = router;    