

// const Certificate = require('../models/certificateModel');
// const path = require('path');
// const multer = require('multer');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// let uploadname;
// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
    
//     const ext = path.extname(file.originalname);
//     cb(null, `${uploadname}${Date.now()}` + ext);
//   }
// });
// const upload = multer({ storage });

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Function to send an email
// const sendEmail = async (to, subject, text, attachments) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: to,
//     subject: subject,
//     text: text,
//     attachments: attachments
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info.response;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// // Controller method to handle file upload and form data
// exports.uploadCertificate = async (req, res) => {
//   try {
//     const { name, email, issueDate } = req.body;
//     const certificatePath = req.file.path; // Path to the uploaded file

//     // Generate the file URL
//     const certificateUrl = `http://${req.headers.host}/uploads/${path.basename(certificatePath)}`;

//     // Create a new Certificate record
//     const certificate = new Certificate({ name, email, issueDate, certificatePath });
//     uploadname=name
//     await certificate.save();


//     // Send email after saving the certificate
//     const mailOptions = {
//       to: email,
//       subject: 'Certificate Uploaded Successfully',
//       text: `Dear ${name},\n\nYour certificate has been uploaded successfully.\n\nIssue Date: ${issueDate}\n\nYou can view your certificate at: ${certificateUrl}\n\nBest Regards,\nYour Company`,
//       attachments: [
//         {
//           filename: path.basename(certificatePath),
//           path: certificatePath
//         }
//       ]
//     };

//     await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text, mailOptions.attachments);

//     res.status(200).json({message:'Certificate sended successfully', certificate, certificateUrl }   );
  
//   } catch (error) {
//     console.error('Error uploading certificate:', error);
//     res.status(500).json({ message: 'Error sending certificate', error });
//   }
// };

// // Middleware for handling file uploads
// exports.upload = upload.single('certificate');





// const Certificate = require('../models/certificateModel');
// const path = require('path');
// const multer = require('multer');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const filename = `${req.body.name}${Date.now()}${ext}`;
//     cb(null, filename);
//   }
// });
// const upload = multer({ storage });

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Function to send an email
// const sendEmail = async (to, subject, text, attachments) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: to,
//     subject: subject,
//     text: text,
//     attachments: attachments
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info.response;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// // Controller method to handle file upload and form data
// exports.uploadCertificate = async (req, res) => {
//   try {
//     const { name, email, issueDate } = req.body;
//     if (!req.file) {
//       throw new Error('No file uploaded.');
//     }
//     const certificatePath = req.file.path; // Path to the uploaded file

//     // Generate the file URL
//     const certificateUrl = `http://${req.headers.host}/uploads/${path.basename(certificatePath)}`;

//     // Create a new Certificate record
//     const certificate = new Certificate({ name, email, issueDate, certificatePath });
//     await certificate.save();

//     // Send email after saving the certificate
//     const mailOptions = {
//       to: email,
//       subject: 'Certificate Uploaded Successfully',
//       text: `Dear ${name},\n\nYour certificate has been uploaded successfully.\n\nIssue Date: ${issueDate}\n\nYou can view your certificate at: ${certificateUrl}\n\nBest Regards,\nYour Company`,
//       attachments: [
//         {
//           filename: path.basename(certificatePath),
//           path: certificatePath
//         }
//       ]
//     };

//     await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text, mailOptions.attachments);

//     res.status(200).json({message:'Certificate sent successfully', certificate, certificateUrl });
  
//   } catch (error) {
//     console.error('Error uploading certificate:', error);
//     res.status(500).json({ message: 'Error sending certificate', error: error.message });
//   }
// };

// // Middleware for handling file uploads
// exports.upload = upload.single('certificate');
















// const Certificate = require('../models/certificateModel');
// const path = require('path');
// const puppeteer = require('puppeteer');
// const nodemailer = require('nodemailer');
// const fs = require('fs');
// require('dotenv').config();

// // Function to generate PDF from HTML content
// const generatePDF = async (htmlContent) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(htmlContent);
//   const pdfBuffer = await page.pdf({
//     format: 'A4',
//     printBackground: true,
//     landscape: false
//   });
//   await browser.close();
//   return pdfBuffer;
// };

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Function to send an email
// const sendEmail = async (to, subject, text, attachments) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: to,
//     subject: subject,
//     text: text,
//     attachments: attachments
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info.response;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// // Controller method to handle file upload and form data
// exports.uploadCertificate = async (req, res) => {
//   try {
//     const { name, email, issueDate, htmlContent } = req.body;

//     if (!htmlContent) {
//       throw new Error('No HTML content provided.');
//     }

//     // Generate PDF from HTML content
//     const pdfBuffer = await generatePDF(htmlContent);
//     const pdfPath = `uploads/${name}_certificate.pdf`;
//     fs.writeFileSync(pdfPath, pdfBuffer);

//     // Generate the file URL
//     const certificateUrl = `http://${req.headers.host}/uploads/${path.basename(pdfPath)}`;

//     // Save certificate details to the database
//     const certificate = new Certificate({ name, email, issueDate, certificatePath: pdfPath });
//     await certificate.save();

//     // Send email with the certificate
//     const mailOptions = {
//       to: email,
//       subject: 'Certificate Uploaded Successfully',
//       text: `Dear ${name},\n\nYour certificate has been uploaded successfully.\n\nIssue Date: ${issueDate}\n\nYou can view your certificate at: ${certificateUrl}\n\nBest Regards,\nYour Company`,
//       attachments: [
//         {
//           filename: `${name}_certificate.pdf`,
//           path: pdfPath
//         }
//       ]
//     };

//     await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text, mailOptions.attachments);

//     res.status(200).json({ message: 'Certificate uploaded successfully', certificate, certificateUrl });

//   } catch (error) {
//     console.error('Error uploading certificate:', error);
//     res.status(500).json({ message: 'Error uploading certificate', error: error.message });
//   }
// };







const Certificate = require('../models/certificateModel');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
require('dotenv').config();

// Utility function to generate file paths
const generateFilePath = (name) => path.join(__dirname, `../uploads/${name}_certificate.pdf`);

// Function to generate PDF from HTML content
const generatePDF = async (htmlContent) => {
  let browser;
  try {
    // Use headless mode for production, headful for development if needed for debugging
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Include background color and styles
      landscape: false,
    });

    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error; // Propagate the error for the caller to handle
  } finally {
    if (browser) await browser.close();
  }
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, attachments) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: attachments ? attachments : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info.response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Controller method to handle file upload and form data
exports.uploadCertificate = async (req, res) => {
  try {
    const { name, email, issueDate, htmlContent } = req.body;

    if (!htmlContent) {
      throw new Error('No HTML content provided.');
    }

    // Generate PDF from HTML content
    const pdfBuffer = await generatePDF(htmlContent);

    // Define file path
    const pdfPath = generateFilePath(name);

    // Write PDF to disk asynchronously
    await fs.writeFile(pdfPath, pdfBuffer);

    // Generate the file URL
    const certificateUrl = `http://${req.headers.host}/uploads/${path.basename(pdfPath)}`;

    // Save certificate details to the database
    const certificate = new Certificate({
      name,
      email,
      issueDate,
      certificatePath: pdfPath,
    });
    await certificate.save();

    // Prepare email details
    const mailOptions = {
      to: email,
      subject: 'Certificate Uploaded Successfully',
      text: `Dear ${name},\n\nYour certificate has been uploaded successfully.\n\nIssue Date: ${issueDate}\n\nYou can view your certificate at: ${certificateUrl}\n\nBest Regards,\nYour Company`,
      attachments: [
        {
          filename: `${name}_certificate.pdf`,
          path: pdfPath,
        },
      ],
    };

    // Send the email with the certificate as an attachment
    await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text, mailOptions.attachments);

    // Respond with success
    res.status(200).json({ message: 'Certificate uploaded successfully', certificate, certificateUrl });

  } catch (error) {
    console.error('Error uploading certificate:', error);
    res.status(500).json({ message: 'Error uploading certificate', error: error.message });
  }
};
