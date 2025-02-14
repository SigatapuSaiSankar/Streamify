// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "20501a12a7@pvpsit.ac.in",
        pass: "tcljqhtxzzrfdqms",
    },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async(req,res)=>{
    try {
        // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <20501a12a7@pvpsit.ac.in>', // sender address
        to: "hikingfaab@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    return res.status(200).json({message: "Message Sent",success: true});
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        return res.status(500).json({message: "Server Error",success: false});
    }
}


export {sendMail}