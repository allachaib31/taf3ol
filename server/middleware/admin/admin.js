const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { Admin } = require('../../models/admin/admin');
const JWTKEY = process.env.JWTKEY;

exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).send({ msg: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWTKEY);
        const admin = await Admin.findById(decoded._id);
        if(!admin) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "Access denied. admin not existe." });
        }
        req.admin = {
            ...decoded,
            permission: admin.permission
        };
        next();
    } catch (err) {
        return res.status(httpStatus.FORBIDDEN).send({ msg: "Invalid token." });
    }
};
