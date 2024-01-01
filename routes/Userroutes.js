const express = require("express");
const router = express.Router();
const { register,login,logout,getMyprofile,Updateprofilepicture,deleteMyprofile} = require("../controllers/UserConstroller")
const {  isAuthenticated }  = require("../middlewares/auth")
const singleupload = require("../middlewares/multer")
 

router.route("/register").post(singleupload,register)
router.route("/login").post(login)  
router.route("/logout").get(logout)  
router.route("/getmyprofile").get(isAuthenticated,getMyprofile)  
router.route("/deletemyProfile").get(isAuthenticated,deleteMyprofile)  
router.route("/updateprofilepicture/:id").put(isAuthenticated,singleupload,Updateprofilepicture)  

module.exports = router;

