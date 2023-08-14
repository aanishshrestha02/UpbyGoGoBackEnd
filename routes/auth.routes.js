const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')

router.post("/register", authController.register );
router.post("/login", authController.login );
router.post("/change-passowrd", auth.verifyUser, authController.changePassword )
// router.post("/forgot-password", customerController.forgetPassword );
  
//   app.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
//     try {
//       const oldUser = await User.findOne({ email });
//       if (!oldUser) {
//         return res.json({ status: "User Not Exists!!" });
//       }
//       const secret = JWT_SECRET + oldUser.password;
//       const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//         expiresIn: "5m",
//       });
//       const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "adarsh438tcsckandivali@gmail.com",
//           pass: "rmdklolcsmswvyfw",
//         },
//       });
  
//       var mailOptions = {
//         from: "youremail@gmail.com",
//         to: "thedebugarena@gmail.com",
//         subject: "Password Reset",
//         text: link,
//       };
  
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//       console.log(link);
//     } catch (error) { }
//   });
  
//   app.get("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     console.log(req.params);
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       res.render("index", { email: verify.email, status: "Not Verified" });
//     } catch (error) {
//       console.log(error);
//       res.send("Not Verified");
//     }
//   });
  
//   app.post("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;
  
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       const encryptedPassword = await bcrypt.hash(password, 10);
//       await User.updateOne(
//         {
//           _id: id,
//         },
//         {
//           $set: {
//             password: encryptedPassword,
//           },
//         }
//       );
  
//       res.render("index", { email: verify.email, status: "verified" });
//     } catch (error) {
//       console.log(error);
//       res.json({ status: "Something Went Wrong" });
//     }
//   });
  
//   app.get("/getAllUser", async (req, res) => {
//     try {
//       const allUser = await User.find({});
//       res.send({ status: "ok", data: allUser });
//     } catch (error) {
//       console.log(error);
//     }
//   });
  
//   app.post("/deleteUser", async (req, res) => {
//     const { userid } = req.body;
//     try {
//       User.deleteOne({ _id: userid }, function (err, res) {
//         console.log(err);
//       });
//       res.send({ status: "Ok", data: "Deleted" });
//     } catch (error) {
//       console.log(error);
//     }
//   });
  
  
  
//   app.get("/paginatedUsers", async (req, res) => {
//     const allUser = await User.find({});
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
  
//     const startIndex = (page - 1) * limit
//     const lastIndex = (page) * limit
  
//     const results = {}
//     results.totalUser=allUser.length;
//     results.pageCount=Math.ceil(allUser.length/limit);
  
//     if (lastIndex < allUser.length) {
//       results.next = {
//         page: page + 1,
//       }
//     }
//     if (startIndex > 0) {
//       results.prev = {
//         page: page - 1,
//       }
//     }
//     results.result = allUser.slice(startIndex, lastIndex);
//     res.json(results)
//   })

module.exports = router