const express = require("express");
const router = express.Router();
const { isAuthenticated, isAuthorizedadmin } = require("../middlewares/auth")
const singleupload = require("../middlewares/multer")
const {register,getallUser,getMyprofile,deleteAllUser,deleteUser,deleteMyprofile,updateUserrole,Updateprofilepictu} = require("../controllers/AdminControllers");
const { Updateprofilepicture } = require("../controllers/UserConstroller");


router.route("/registerAdmin").post(singleupload,register)
router.route("/getUsers").get(isAuthenticated, isAuthorizedadmin, getallUser)
router.route("/updaterole/:id").get(isAuthenticated, isAuthorizedadmin, updateUserrole)
router.route("/deleteusers/:id").delete(isAuthenticated, isAuthorizedadmin, deleteUser)
router.route("/deleteusers").delete(isAuthenticated, isAuthorizedadmin,deleteAllUser)
router.route("/deleteMyProfile").delete(isAuthenticated,isAuthorizedadmin,deleteMyprofile)
router.route("/updateprofile/:id").put(isAuthenticated,isAuthorizedadmin , singleupload,Updateprofilepicture)
router.route("/getMyProfile").get(isAuthenticated,isAuthorizedadmin,getMyprofile)

module.exports = router;