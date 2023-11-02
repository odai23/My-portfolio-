//toggle bar

window.onload = function () {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar");

  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });
};

const express = require("express");
const app = express();

// body-parser middleware to parse form data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// send-email route
app.post("/send-email", (req, res) => {
  const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "odai23.om@gmail.com", // replace with your Gmail account email address
      pass: "6016333054om.n", // replace with your Gmail account password
    },
  });

  // send mail with defined transport object
  transporter.sendMail(
    {
      from: "user-1@gmail.com", // replace with your Gmail account email address
      to: "odai23.om@gmail.com", // replace with your email address where you want to receive the message
      subject: "New message from your website", // replace with the subject of the email
      text:
        "Name: " +
        req.body.name +
        "\nEmail: " +
        req.body.email +
        "\nSubject: " +
        req.body.subject +
        "\nMessage: " +
        req.body.message, // replace with the body of the email, including the data from the form
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
});

// start the server
app.listen(3000, () => console.log("Server running on port 3000"));
