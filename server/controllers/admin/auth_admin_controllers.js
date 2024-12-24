const { Admin, validateAdmin } = require('../../models/admin/admin');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const JWTKEY = process.env.JWTKEY;
const SALTROUNDS = Number(process.env.SALTROUNDS);

exports.authAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        } else if (admin.isBlocked) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "تم تعليق حسابك" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: admin._id }, JWTKEY, { expiresIn: '24h' });
        admin.lastLogin = new Date();
        await admin.save();
        // Respond with token
        return res.status(httpStatus.OK).send({
            msg: "تم تسجيل الدخول بنجاح",
            token
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "البريد الالكتروني غير موجود"
            });
        } else if (admin.isBlocked) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "تم تعليق حسابك" });
        }

        const token = jwt.sign({ adminId: admin._id }, JWTKEY, { expiresIn: '1h' });;

        // Create a URL with the token
        const resetLink = `${process.env.URL}/reset-password/${token}`;
        // Send email (using nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or another service
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const emailHtml = await ejs.renderFile(path.join(__dirname, '../../views/reset-password.ejs'), {
            adminName: admin.username,
            resetLink: resetLink,
            //logoUrl: '',
            year: new Date().getFullYear(),
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: 'Password Reset',
            html: emailHtml,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../views/Logo.png'),
                    cid: 'logo', // Same CID as in the HTML template
                },
            ]
        };

        await transporter.sendMail(mailOptions);
        return res.status(httpStatus.OK).send({
            msg: 'تم إرسال بريد إلكتروني لإعادة تعيين كلمة المرور'
        });
    } catch (err) {
        console.log(err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, JWTKEY); // Verify the token

        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            return res.status(httpStatus.NOT_FOUND).send({ success: false, msg: 'Admin not found' });
        } else if (admin.isBlocked) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "تم تعليق حسابك" });
        }

        // Hash the new password
        admin.password = bcrypt.hashSync(password, SALTROUNDS);
        await admin.save();

        return res.status(httpStatus.OK).send({ success: true, msg: 'Password updated successfully' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(httpStatus.UNAUTHORIZED).send({ success: false, msg: 'Token has expired, please request a new password reset' });
        }

        // Handle other types of JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(httpStatus.UNAUTHORIZED).send({ success: false, msg: 'Invalid token, please request a new password reset' });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ success: false, msg: 'Invalid token or server error' });
    }
}

exports.isValidateToken = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("_id email username name image")
        if (admin.isBlocked) {
            return res.status(httpStatus.UNAUTHORIZED).send({ msg: "تم تعليق حسابك" });
        }
        return res.status(200).send({
            msg: "تم تسجيل الدخول بنجاح",
            admin
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}