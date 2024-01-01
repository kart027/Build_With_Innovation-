const ErrorHandler = require("../utils/Errorhandler");
const User = require("../models/Usermodels");
const { CatchAsyncError } = require("../middlewares/CatchAsyncError");
const { sendToken } = require("../utils/SendToken");


const cloudinary = require("cloudinary")
const getDatauri = require("../utils/DataUri")
exports.register = CatchAsyncError(async (req, res, next) => {
    const { name, email, phoneNumber, password } = req.body;
    const file = req.file;


    if (!name || !password ) {
        return next(new ErrorHandler("Please addd all field", 400))
    }



    let user = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    });

    if (user) {
        return next(new ErrorHandler("User alerdy exist"), 409)
    }


    const fileuri = getDatauri(file)

    const mycloud = await cloudinary.v2.uploader.upload(fileuri.content)
    user = await User.create({
        name,
        email,
        phoneNumber,
        role:"admin",
        password,
        profileImage: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }
    })

    

    sendToken(res, user, "Registerred Succesfully", 201);
})


exports.getMyprofile = CatchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        sucess: true,
        user
    })

})


exports.deleteMyprofile = CatchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400))
    }


    await cloudinary.v2.uploader.destroy(user.profileImage.public_id);

    await user.remove();

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        //secure:true,

    }).json({
        sucess: true,
        message: "user deleted"
    })

})


exports.Updateprofilepicture = CatchAsyncError(async (req, res, next) => {
    const { name } = req.body;

    const user = await User.findById(req.params.id)
    if (name) user.name = name;


    if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400))
    }
        if(req.file){
    const file = req.file;

    const fileuri = getDatauri(file)

    const mycloud = await cloudinary.v2.uploader.upload(fileuri.content)

    await cloudinary.v2.uploader.destroy(user.profileImage.public_id);

    user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
    }
        }
    await user.save();

    res.status(200).json({
        sucess: true,
        message: "Profile updated"
    })

})




// Admin

exports.getallUser = CatchAsyncError(async (req, res, next) => {

    const user = await User.find()
    res.status(200).json({
        sucess: true,
        user
    })

})


exports.updateUserrole = CatchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("Token is invalid or hass been expired"))
    }

    if (user.role == "user") {
        user.role = "admin"
    } else {
        user.role = "user"
    }

    await user.save()

    res.status(200).json({
        sucess: true,
        message: "user role updated"
    })

})



exports.deleteUser = CatchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("Token is invalid or hass been expired"))
    }

    await cloudinary.v2.uploader.destroy(user.profileImage.public_id);

    
    await user.remove();

    res.status(200).json({
        sucess: true,
        message: "Deleted"
    })

})

exports.deleteAllUser = CatchAsyncError(async (req, res, next) => {

     await User.findById({ role: { $ne: 'admin' } })

    res.status(200).json({
        sucess: true,
        message: "Deleted"
    })

})







