import OTP from "../model/otp.model.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import User from "../model/user.model.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.MAIL_PASS_KEY,
    },
});

const sendOTP = async (req, res, next) => {
    const { _id, email } = req.body;
    try {
        const randomNumber = Math.floor(1000 + Math.random() * 9000).toString(); // Convert to string
        await transporter.sendMail({
            from: `"Streamify OTP" <${process.env.SENDER_MAIL}>`, // sender address
            to: email, // recipient email address
            subject: "Your Streamify One-Time Password (OTP)", // subject line
            text: `Hello,
            
            Your One-Time Password (OTP) for verifying your account on Streamify is: ${randomNumber}
            
            This OTP is valid for a limited time. If you did not request this, please ignore this email.
            
            Thank you,
          The Streamify Team`, // plain text body
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Hello,</h2>
                    <p>Your One-Time Password (OTP) for verifying your account on <strong>Streamify</strong> is:</p>
                    <h1 style="color: #2F80ED;">${randomNumber}</h1>
                    <p>This OTP is valid for a limited time. If you did not request this, please ignore this email.</p>
                    <br/>
                    <p>Thank you,<br/>The Streamify Team</p>
                   </div>` // HTML body
        });


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomNumber, salt);

        const otpData = new OTP({
            userId: _id,
            otp: hashedPassword,
            createdAt: Date.now(),
            expiresAt: Date.now() + 2 * 60 * 1000,
        });

        await otpData.save();

        return res.status(200).json({ message: "OTP sent ✅", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed sending OTP", success: false });
    }
};

const verifyOTP = async (req, res, next) => {
    const { _id, otp } = req.body;
    try {

        const userOTPs = await OTP.find({ userId: _id }).sort({ createdAt: -1 });

        if (!userOTPs || userOTPs.length === 0) {
            return res.status(404).json({ message: "Please try Re-Requesting the OTP", success: false });
        }

        const latestOTP = userOTPs[0];

        if (latestOTP.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP exprired", success: false });
        }

        const compareOTP = await bcrypt.compare(otp, latestOTP.otp);
        if (!compareOTP) {
            return res.status(200).json({ message: "Wrong OTP", success: false });
        }

        const userData = await User.findOne({ _id: _id });
        await User.findByIdAndUpdate({ _id: _id }, { valid: true }, { new: true });

        // delete the otp from OTP DB
        await OTP.deleteMany({ userId: _id });

        return res.status(200).json({ message: "User Validated successful", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false })
    }
}

export { sendOTP, verifyOTP }