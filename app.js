const express= require("express");
const fs=require("fs");
const path= require("path");
const nodemailer = require("nodemailer");


const app = express()

app.use(express.urlencoded())
// VIEW SPECIFIC STUFF
app.set("view engine","pug");
app.set("/views",path.join(__dirname,"views"));

// STATIC SPECIFIC STUFF
app.use("/static",express.static("static"));

// ENDPOINT SPECIFIC STUFF
app.get("/",(req,res)=>{
    res.status(200).render("Home.pug");
})

app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");
})

app.post("/contact",(req,res)=>{
    let userInformation = {
        name:`${req.body.name}`,
        age:`${req.body.age}`,
        gender:`${req.body.gender}`,
        Address:`${req.body.address}`,
        more:`${req.body.more}`,

    }

    let transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"the.akashrajiwale@gmail.com",
            pass:"AKASH@123"
        }
    });

    let emailDetails = {
        from:`${req.body.email}`,
        to:"the.akashrajiwale@gmail.com",
        subject:"new client details",
        text:`
        congrets we achive new client!
        name:${req.body.name}
        age:${req.body.age}
        gender:${req.body.gender}
        Address:${req.body.address},
        more about client:${req.body.more}`
    }

    transport.sendMail(emailDetails,function(error,info){
        if(error){
            console.log("fail to sent mail please try again")
        }
        else{
            console.log("mail sent" + info.responce);
        }

    });
    res.status(200).render("Home.pug")

});

app.listen(80,()=>{
    console.log(`app is running on http://localhost`);
    
})



