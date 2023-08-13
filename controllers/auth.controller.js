const Customer = require('../models/customers');
const bcrypt = require("bcryptjs");

const authController = {};

authController.register = async (req, res) => {
    try {
        const { name, phonenumber, address, email, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const checkCustomer = await Customer.query().findOne('email', email);

        if (checkCustomer) {
            return res.json({ error: "Customer Already Exists" });
        }
        const insertData = {
            name,
            email,
            phonenumber,
            address,
            password: encryptedPassword
        };
        const result = await Customer.query().insert(insertData);
        if (result) {
            const authToken = result.generateAuthToken(result.customerId);
            return res.json({
                success: true,
                data: result,
                authToken,
                message: "New Customer Created"
            });
        } else {
            return res.json({
                success: false,
                message: "Somethings went wrong"
            });
        }
    } catch (error) {
        res.status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};


authController.login = async (req, res) => {
    try {
        const checkCustomer = await Customer.query().findOne('email', req.body.email);

        if (!checkCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        if (await bcrypt.compare(req.body.password, checkCustomer.password)) {
            const authToken = checkCustomer.generateAuthToken(checkCustomer.customerId);
            res.status(200).json({
                success: true,
                message: "Login Successful",
                authToken,
                data: checkCustomer,
            });
        } else {
            res.status(401)
                .json({ success: false, message: "Invalid credentials!!" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};

authController.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "adarsh438tcsckandivali@gmail.com",
                pass: "rmdklolcsmswvyfw",
            },
        });

        var mailOptions = {
            from: "youremail@gmail.com",
            to: "thedebugarena@gmail.com",
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log(link);
    } catch (error) { }
};



module.exports = authController;