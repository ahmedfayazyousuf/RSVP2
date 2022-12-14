const express = require('express')
const app = express();
require("dotenv").config()
var path = require('path');

// dotenv.config({path: './.env' });

require("./db/db");

var User = require('./model/User')
const  ObjectID = require('mongodb').ObjectId;

var cron = require('node-cron');

const schedule = require('node-schedule');



const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;


const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const static_path = path.join(__dirname);
app.use(express.static(static_path));

app.use(cors({
    origin: "*",
));

// const job = schedule.scheduleJob('*/20 * * * * *', function(){
//     User.find({Status: "NA"}).then((user) => {
//         console.log(user[0].Email)

//         const trans = nodemailer.createTransport({
//             host: MAIL_HOST,
//             port: MAIL_PORT,
//             auth: {
//                 user: MAIL_USER,
//                 pass: MAIL_PASS
//             },
//             tls: {
//                 secureProtocol: "TLSv1_method"
//             }
    
//         })

//         user.map(async (user) => {
//             var url = `http://localhost:3000/user/${user._id}`;

//             await trans.sendMail({
//                 from: MAIL_FROM,
//                 to: `${user.Email}`,
//                 subject: "Invitation",
//                 attachments: [{
//                     filename: 'image.png',
//                     path:  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${url}`,
//                     cid: 'unique@nodemailer.com' //same cid value as in the html img src
//                 }],
//                 html: `<head>
//             <title></title>
//             <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
//             <style>
//                 * {
//                     box-sizing: border-box;
//                 }
        
//                 body {
//                     margin: 0;
//                     padding: 0;
//                 }
        
//                 a[x-apple-data-detectors] {
//                     color: inherit !important;
//                     text-decoration: inherit !important;
//                 }
        
//                 #MessageViewBody a {
//                     color: inherit;
//                     text-decoration: none;
//                 }
        
//                 p {
//                     line-height: inherit
//                 }
        
//                 .desktop_hide,
//                 .desktop_hide table {
//                     mso-hide: all;
//                     display: none;
//                     max-height: 0px;
//                     overflow: hidden;
//                 }
        
//                 @media (max-width:705px) {
        
//                     .desktop_hide table.icons-inner,
//                     .social_block.desktop_hide .social-table {
//                         display: inline-block !important;
//                     }
        
//                     .icons-inner {
//                         text-align: center;
//                     }
        
//                     .icons-inner td {
//                         margin: 0 auto;
//                     }
        
//                     .row-content {
//                         width: 100% !important;
//                     }
        
//                     .mobile_hide {
//                         display: none;
//                     }
        
//                     .stack .column {
//                         width: 100%;
//                         display: block;
//                     }
        
//                     .mobile_hide {
//                         min-height: 0;
//                         max-height: 0;
//                         max-width: 0;
//                         overflow: hidden;
//                         font-size: 0px;
//                     }
        
//                     .desktop_hide,
//                     .desktop_hide table {
//                         display: table !important;
//                         max-height: none !important;
//                     }
//                 }
//             </style>
//         </head>
        
//         <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//             <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//                 <tbody>
//                     <tr>
//                         <td>
//                             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                 <tr>
//                                                                     <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: center;">
//                                                                         <table class="alignment" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                             <tr>
//                                                                                 <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/866528_850654/thhlogoo.png" alt height="32" width="50" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
//                                                                             </tr>
//                                                                         </table>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 60px; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                 <tr>
//                                                                     <td class="pad" style="text-align:center;width:100%;">
//                                                                         <h1>Dear ${user.Name} ,</h1>
//                                                                         <h1 style="margin: 0; color: #000; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 33px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Thank you for Registering with THH&nbsp;</span></h1>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                 <tr>
//                                                                     <td class="pad" style="text-align:center;width:100%;">
//                                                                         <h2 style="margin: 0; color: #000; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Here is your Invitation: -</span></h2>
//                                                                         <p>This is a reminder Mail</p>
//                                                                         <img src="cid:unique@nodemailer.com" height="300" width="300" alt="QR Code"/>
//                                                                         <p>${url}</p>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                                                 <tr>
//                                                                     <td class="pad" style="padding-left:25px;">
//                                                                         <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
//                                                                             <p style="margin: 0; margin-bottom: 4px;">Regards,</p>
//                                                                             <p style="margin: 0;"><strong>THH Team</strong></p>
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="social_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                 <tr>
//                                                                     <td class="pad" style="text-align:center;padding-right:0px;padding-left:0px;">
//                                                                         <div class="alignment" style="text-align:center;">
//                                                                             <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                                                                 <tr>
//                                                                                     <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/thehanginghouse" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                                                                     <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com/thehanginghouse" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
//                                                                                     <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/company/thehanginghouse" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" width="32" height="32" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
//                                                                                     <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com//thehanginghouse/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" width="32" height="32" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                                                                 </tr>
//                                                                             </table>
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1d1818;">
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 685px;" width="685">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                                                 <tr>
//                                                                     <td class="pad">
//                                                                         <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;"></div>
//                                                                     </td>
//                                                                 </tr>
//                                                             </table>
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <!-- End -->`
//                 // attachments: [{
//                 //     filename: 'image.png',
//                 //     path:  `${qr}`,
//                 //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
//                 // }],
//             //     html: `<div className="email" style="
//             //     border: 1px solid black;
//             //     padding: 20px;
//             //     font-family: sans-serif;
//             //     line-height: 2;
//             //     font-size: 20px; 
//             //     ">
//             //     <h2>Here is your QR Code: -</h2>
//             //     <p></p>
        
//             //     <img src="cid:unique@nodemailer.com" height="300" width="300" alt="Red dot"/>
            
//             //     <p>Enjoy!</p>
//             //      </div>
//             // `
        
//             })
//         })
 
//        })
// //   console.log('The answer to life, the universe, and everything!');
// });

app.use(express.static('public')) 

// app.get('/send_mail', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Origin', 'https://rsvpadmin-ksbft05ap-adis0928.vercel.app/');
//     res.send('Hello World');
// })

app.post("/send_mail",async (req,res, next)=>{

    // res.header('Access-Control-Allow-Origin', 'https://rsvpadmin-ksbft05ap-adis0928.vercel.app/');

    // res.header('Access-Control-Allow-Origin', '*');
    // res.send('Hello World');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.header('Access-Control-Allow-Credentials', true); // If needed


    let { to, name } = req.body
    const trans = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        },
        tls: {
            secureProtocol: "TLSv1_method"
        }

    })



    const newUser = User({
        Email: to,
        Name: name
    })

   

    await newUser.save(async function(err,user){
        var url2 = `http://localhost:3000/Success/${user._id}`;
        var url = `http://localhost:3000/Registration/${user._id}`;
        var urlname = `https://rsvpadmin.vercel.app/video/${name}`;
        await trans.sendMail({
            from: MAIL_FROM,
            to: `${to}`,
            subject: "Invitation",
            attachments: [{
                filename: 'image.png',
                path:  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${urlname}`,
                cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }],
            html: `<!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
            
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
                <!--<![endif]-->
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    .desktop_hide,
                    .desktop_hide table {
                        mso-hide: all;
                        display: none;
                        max-height: 0px;
                        overflow: hidden;
                    }
            
                    @media (max-width:620px) {
                        .desktop_hide table.icons-inner {
                            display: inline-block !important;
                        }
            
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
            
                        .image_block img.big,
                        .row-content {
                            width: 100% !important;
                        }
            
                        .mobile_hide {
                            display: none;
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block;
                        }
            
                        .mobile_hide {
                            min-height: 0;
                            max-height: 0;
                            max-width: 0;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide,
                        .desktop_hide table {
                            display: table !important;
                            max-height: none !important;
                        }
                    }
                </style>
            </head>
            
            <body style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/826291_810261/nislap_1.png" style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;" width="600"></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TODAY.</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TOGETHER.</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">TO THE FUTURE.</span></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">AFTERSALES</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-top:5px;">
                                                                            <div style="color:#000000;direction:ltr;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; margin-bottom: 0px;">Dear ${name},</p>
                                                                                <p style="margin: 0; margin-bottom: 0px;"><br>Every day Nissan dedicates itself to the sole</p>
                                                                                <p style="margin: 0; margin-bottom: 0px;">purpose of creating Innovation that Excites. This year we're excited to introduce Innovation that creates efficient customer experiences.&nbsp;</p>
                                                                                <p style="margin: 0;"><br>Please join us as we take Nissan service excellence to the next level! We have allocated a virtual vehicle to you to ensure that you have the best experience of what the future has in store.</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Date: 25-26 January 2022</span></strong></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Time: 00:00 - 00:00 </span></strong></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Venue: The Ritz-Carlton, Dubai&nbsp;</span></strong></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                            <div class="alignment" align="center" style="line-height:10px"><img src="cid:unique@nodemailer.com" style="display: block; height: auto; border: 0; width: 105px; max-width: 100%;" width="105" alt="I'm an image" title="I'm an image"></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #737373; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Scan the QR code with your phone to unlock your personal invitation.</span></strong></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2;">
                                                                                    <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>RSVP closes on 00 Month 2022. We look forward to welcoming you.</strong></span></p>
                                                                                    <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>Please note this invitation is strictly non-transferable.</strong></span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                            <div class="alignment" align="center">
                                                                                <a href="${url2}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will not be attending</span></span></a>
                                                                                <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                            <div class="alignment" align="center">
                                                                                <a href="${url}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will be attending</span></span></a>
                                                                                <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                <tr>
                                                                                    <td class="alignment" style="vertical-align: middle; text-align: center;">
                                                                                        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                        <!--[if !vml]><!-->
                                                                                        <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation">
                                                                                            <!--<![endif]-->
                                                                                            <tr>
                                                                                                <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="text-decoration: none;"><img class="icon" alt="Designed with BEE" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_510656/Signature/bee.png" height="32" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                                                                <td style="font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="color: #9d9d9d; text-decoration: none;">Designed with BEE</a></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><!-- End -->
            </body>
            
            </html>`
            // attachments: [{
            //     filename: 'image.png',
            //     path:  `${qr}`,
            //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
            // }],
        //     html: `<div className="email" style="
        //     border: 1px solid black;
        //     padding: 20px;
        //     font-family: sans-serif;
        //     line-height: 2;
        //     font-size: 20px; 
        //     ">
        //     <h2>Here is your QR Code: -</h2>
        //     <p></p>
    
        //     <img src="cid:unique@nodemailer.com" height="300" width="300" alt="Red dot"/>
        
        //     <p>Enjoy!</p>
        //      </div>
        // `
       
        })

    });

    




})

app.post("/send_all",cors(),async (req,res)=>{
    let { to, id, name } = req.body
    
    const trans = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        },
        tls: {
            secureProtocol: "TLSv1_method"
        }

    })

   



    var url2 = `http://localhost:3000/Success/${id}`;
    var url = `http://localhost:3000/Registration/${id}`;
    var urlname = `https://rsvpadmin.vercel.app/video/${name}`;
    console.log(urlname)

    await trans.sendMail({
        from: MAIL_FROM,
        to: `${to}`,
        subject: "Invitation",
        attachments: [{
            filename: 'image.png',
            path:  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${urlname}`,
            cid: 'unique@nodemailer.com' //same cid value as in the html img src
        }],
        html: `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
            <!--<![endif]-->
            <style>
                * {
                    box-sizing: border-box;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                }
        
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }
        
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }
        
                p {
                    line-height: inherit
                }
        
                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }
        
                @media (max-width:620px) {
                    .desktop_hide table.icons-inner {
                        display: inline-block !important;
                    }
        
                    .icons-inner {
                        text-align: center;
                    }
        
                    .icons-inner td {
                        margin: 0 auto;
                    }
        
                    .image_block img.big,
                    .row-content {
                        width: 100% !important;
                    }
        
                    .mobile_hide {
                        display: none;
                    }
        
                    .stack .column {
                        width: 100%;
                        display: block;
                    }
        
                    .mobile_hide {
                        min-height: 0;
                        max-height: 0;
                        max-width: 0;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide,
                    .desktop_hide table {
                        display: table !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        
        <body style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent;">
                <tbody>
                    <tr>
                        <td>
                            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                        <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/826291_810261/nislap_1.png" style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;" width="600"></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;width:100%;">
                                                                        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TODAY.</span></strong></h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;width:100%;">
                                                                        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TOGETHER.</span></strong></h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;width:100%;">
                                                                        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">TO THE FUTURE.</span></h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="heading_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
                                                                        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">AFTERSALES</span></strong></h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad" style="padding-top:5px;">
                                                                        <div style="color:#000000;direction:ltr;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0; margin-bottom: 0px;">Dear ${name},</p>
                                                                            <p style="margin: 0; margin-bottom: 0px;"><br>Every day Nissan dedicates itself to the sole</p>
                                                                            <p style="margin: 0; margin-bottom: 0px;">purpose of creating Innovation that Excites. This year we're excited to introduce Innovation that creates efficient customer experiences.&nbsp;</p>
                                                                            <p style="margin: 0;"><br>Please join us as we take Nissan service excellence to the next level! We have allocated a virtual vehicle to you to ensure that you have the best experience of what the future has in store.</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                            <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Date: 25-26 January 2022</span></strong></p>
                                                                                <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Time: 00:00 - 00:00 </span></strong></p>
                                                                                <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Venue: The Ritz-Carlton, Dubai&nbsp;</span></strong></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                        <div class="alignment" align="center" style="line-height:10px"><img src="cid:unique@nodemailer.com" style="display: block; height: auto; border: 0; width: 105px; max-width: 100%;" width="105" alt="I'm an image" title="I'm an image"></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                        <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                            <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #737373; line-height: 1.2;">
                                                                                <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Scan the QR code with your phone to unlock your personal invitation.</span></strong></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                            <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2;">
                                                                                <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>RSVP closes on 00 Month 2022. We look forward to welcoming you.</strong></span></p>
                                                                                <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>Please note this invitation is strictly non-transferable.</strong></span></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                        <div class="alignment" align="center">
                                                                            <a href="${url2}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will not be attending</span></span></a>
                                                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                        <div class="alignment" align="center">
                                                                            <a href="${url}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will be attending</span></span></a>
                                                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="alignment" style="vertical-align: middle; text-align: center;">
                                                                                    <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                    <!--[if !vml]><!-->
                                                                                    <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation">
                                                                                        <!--<![endif]-->
                                                                                        
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table><!-- End -->
        </body>
        
        </html>`

    
    })

})

app.post("/send_confirmation",cors(),async (req,res)=>{
    let { to, name } = req.body
    const trans = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        },
        tls: {
            secureProtocol: "TLSv1_method"
        }

    })



    const newUser = User({
        Email: to,
        Name: name
    })

   

    await newUser.save(async function(err,user){
        var url2 = `http://localhost:3000/Success/${user._id}`;
        var url = `http://localhost:3000/Registration/${user._id}`;
        var urlname = `https://rsvpadmin.vercel.app/video/${name}`;
        await trans.sendMail({
            from: MAIL_FROM,
            to: `${to}`,
            subject: "Invitation",
            attachments: [{
                filename: 'image.png',
                path:  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${urlname}`,
                cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }],
            html: `<!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
            
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
                <!--<![endif]-->
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    .desktop_hide,
                    .desktop_hide table {
                        mso-hide: all;
                        display: none;
                        max-height: 0px;
                        overflow: hidden;
                    }
            
                    @media (max-width:620px) {
                        .desktop_hide table.icons-inner {
                            display: inline-block !important;
                        }
            
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
            
                        .image_block img.big,
                        .row-content {
                            width: 100% !important;
                        }
            
                        .mobile_hide {
                            display: none;
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block;
                        }
            
                        .mobile_hide {
                            min-height: 0;
                            max-height: 0;
                            max-width: 0;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide,
                        .desktop_hide table {
                            display: table !important;
                            max-height: none !important;
                        }
                    }
                </style>
            </head>
            
            <body style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/826291_810261/nislap_1.png" style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;" width="600"></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TODAY.</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">TOGETHER.</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">TO THE FUTURE.</span></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="heading_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">AFTERSALES</span></strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-top:5px;">
                                                                            <div style="color:#000000;direction:ltr;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; margin-bottom: 0px;">Dear ${name},</p>
                                                                                <p style="margin: 0; margin-bottom: 0px;"><br>Every day Nissan dedicates itself to the sole</p>
                                                                                <p style="margin: 0; margin-bottom: 0px;">purpose of creating Innovation that Excites. This year we're excited to introduce Innovation that creates efficient customer experiences.&nbsp;</p>
                                                                                <p style="margin: 0;"><br>Please join us as we take Nissan service excellence to the next level! We have allocated a virtual vehicle to you to ensure that you have the best experience of what the future has in store.</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Date: 25-26 January 2022</span></strong></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Time: 00:00 - 00:00 </span></strong></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Venue: The Ritz-Carlton, Dubai&nbsp;</span></strong></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                            <div class="alignment" align="center" style="line-height:10px"><img src="cid:unique@nodemailer.com" style="display: block; height: auto; border: 0; width: 105px; max-width: 100%;" width="105" alt="I'm an image" title="I'm an image"></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #737373; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><strong><span style="font-size:14px;">Scan the QR code with your phone to unlock your personal invitation.</span></strong></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2;">
                                                                                    <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>RSVP closes on 00 Month 2022. We look forward to welcoming you.</strong></span></p>
                                                                                    <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:14px;"><strong>Please note this invitation is strictly non-transferable.</strong></span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                            <div class="alignment" align="center">
                                                                                <a href="${url2}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will not be attending</span></span></a>
                                                                                <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;padding-top:5px;padding-bottom:5px;">
                                                                            <div class="alignment" align="center">
                                                                                <a href="${url}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;">I will be attending</span></span></a>
                                                                                <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                <tr>
                                                                                    <td class="alignment" style="vertical-align: middle; text-align: center;">
                                                                                        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                        <!--[if !vml]><!-->
                                                                                        <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation">
                                                                                            <!--<![endif]-->
                                                                                            <tr>
                                                                                                <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="text-decoration: none;"><img class="icon" alt="Designed with BEE" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_510656/Signature/bee.png" height="32" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                                                                <td style="font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="color: #9d9d9d; text-decoration: none;">Designed with BEE</a></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><!-- End -->
            </body>
            
            </html>`
            // attachments: [{
            //     filename: 'image.png',
            //     path:  `${qr}`,
            //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
            // }],
        //     html: `<div className="email" style="
        //     border: 1px solid black;
        //     padding: 20px;
        //     font-family: sans-serif;
        //     line-height: 2;
        //     font-size: 20px; 
        //     ">
        //     <h2>Here is your QR Code: -</h2>
        //     <p></p>
    
        //     <img src="cid:unique@nodemailer.com" height="300" width="300" alt="Red dot"/>
        
        //     <p>Enjoy!</p>
        //      </div>
        // `
       
        })

    });

    




})


app.put('/user_update', async (req,res) => {

    let {user_id, status} = req.body;
    await User.findOneAndUpdate({ _id: user_id }, { Status: status });
})

// app.listen((process.env.PORT || 4000, () =>{
//     console.log("Server is listening to port 4000")
// }))

app.get('/user_accepted', (req,res) =>{
 User.find({Status: "Accepted"}).then(user => {
    res.json(user)
   })
})

app.get('/user_rejected', (req,res) =>{
    User.find({Status: 'Rejected'}).then(user => {
        console.log(user)
        res.json(user)
       })
})

app.get('/user_na', (req,res) => {
    User.find({Status: "NA"}).then(user => {
        res.json(user)
       })
})

app.get('/user_attended', (req,res) => {
    User.find({Status: "Attended"}).then(user => {
        res.json(user)
       })
})

app.get('/user_all', (req,res) => {
    User.find({}).then(user => {
        res.json(user)
       })
})

app.get('/user_one/:id', (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    User.find({"_id": ObjectId(req.params.id) }).then(user => {
        res.json(user)
       })
})


app.put('/register_update', async (req,res) => {

    let { id, firstname, surname, city, opdiv, jobtitle, email, mob, gender, smoking, preferences, dietreq, physcon} = req.body;
    await User.findOneAndUpdate({ _id: id }, { firstname: firstname, surname: surname, city: city, opdiv: opdiv, jobtitle: jobtitle, email:email, mob:mob, gender:gender, smoking:smoking, preferences: preferences, dietreq: dietreq, physcon: physcon });

    res.send({status:200});
})

var PORT = process.env.PORT || 4000;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})


