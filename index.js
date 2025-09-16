const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.USER,
      pass: process.env.USERPASS
    },
  });

app.post("/contact",(req,res)=>{

    const {message,name,email,phone} = req.body;
    console.log(req.body)

    const mailOptions = {
        from: process.env.USER,
        to: "mail@usesfoundation.org",
        subject: "USES Foundation Website Visitor",
        text: "name:"+name+"\n\nemail:"+email+"\n\nphone:"+phone+"\n\nmessage:"+message
      };


      if(!(message && name && email && phone))
        return res.json({status:"Not Ok",message:"Message not sent",error:"Name, Email, Message is required"})

      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      return res.json({status:"Ok",message:"Message sent successfully"})

})


app.listen(process.env.PORT,()=>console.log(`Server is running at port ${process.env.PORT}`))