const jsw = require("jsonwebtoken");
const Customer = require("../models/customers");

module.exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jsw.verify(token, process.env.MY_SECRET_KEY);
        await Customer.query().findById(user.id)
            .then((userData) => {
                req.customer = userData;
            })
            .catch(err =>
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user"
                }));
        next();
    }
    catch (e) {
        res.status(401).json({
            success: false,
            error: e
        });
    }
};