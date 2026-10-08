require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 3000;
// Gmail email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Allow the server to receive JSON data
app.use(express.json());


// Serve the D6Tech website files
app.use(express.static(__dirname));


// Test backend route
app.get("/api/test", (req, res) => {

    res.json({
        message: "D6Tech backend is working!"
    });

});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {

    const { name, email, message } = req.body;

    // Check that all fields were provided
   // Validate the submitted data
if (!name || !email || !message) {

    return res.status(400).json({
        success: false,
        message: "Please complete all fields."
    });

}

if (!email.includes("@")) {

    return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
    });
    if (name.length > 100) {

    return res.status(400).json({
        success: false,
        message: "Name is too long."
    });

}

if (email.length > 150) {

    return res.status(400).json({
        success: false,
        message: "Email address is too long."
    });

}

if (message.length > 5000) {

    return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 5000 characters."
    });

}

}

    try {

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New D6Tech enquiry from ${name}`,

            text:
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
        });


        console.log("Email sent successfully.");

        res.json({
            success: true,
            message: "Thank you, " + name + "! Your message has been sent successfully."
        });

    } catch (error) {

        console.error("Email sending error:", error);

        res.status(500).json({
            success: false,
            message: "Sorry, we could not send your message. Please try again."
        });

    }

});

// Start the server
app.listen(PORT, () => {

    console.log(`D6Tech server running at http://localhost:${PORT}`);

});