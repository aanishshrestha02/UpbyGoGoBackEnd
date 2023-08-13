// const Customer = require('../models/customers');
// const bcrypt = require("bcryptjs");

// const customerController = {};

// customerController.register = async (req, res) => {
//     try {
//         const { name, phonenumber, address, email, password } = req.body;

//         const encryptedPassword = await bcrypt.hash(password, 10);

//         const checkCustomer = await Customer.query().findOne('email', email);

//         if (checkCustomer) {
//             return res.json({ error: "Customer Already Exists" });
//         }
//         const insertData = {
//             name,
//             email,
//             phonenumber,
//             address,
//             password: encryptedPassword
//         };
//         const result = await Customer.query().insert(insertData);
//         if (result) {
//             const authToken = result.generateAuthToken(result.customerId);
//             return res.json({
//                 success: true,
//                 data: result,
//                 authToken,
//                 message: "New Customer Created"
//             });
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Somethings went wrong"
//             });
//         }
//     } catch (error) {
//         res.status(500)
//             .json({ success: false, message: "Something went wrong" });
//     }
// };


// customerController.login = async (req, res) => {
//     try {
//         const checkCustomer = await Customer.query().findOne('email', req.body.email);

//         if (!checkCustomer) {
//             return res.status(404).json({ success: false, message: "Customer not found" });
//         }

//         if (await bcrypt.compare(req.body.password, checkCustomer.password)) {
//             const authToken = checkCustomer.generateAuthToken(checkCustomer.customerId);
//             res.status(200).json({
//                 success: true,
//                 message: "Login Successful",
//                 authToken,
//                 data: checkCustomer,
//             });
//         } else {
//             res.status(401)
//                 .json({ success: false, message: "Invalid credentials!!" });
//         }
//     } catch (error) {
//         res.status(500)
//             .json({ success: false, message: "Something went wrong" });
//     }
// };



// module.exports = customerController;