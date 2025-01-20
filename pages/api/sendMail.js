// pages/api/sendMail.js

import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // you can use other services (e.g., Outlook, SendGrid, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Your email account
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  try {
    // Sending the email
    await transporter.sendMail({
      from: email, // sender address
      to: 'your-email@example.com', // receiver's email (support team, consultation team)
      subject: `Consultation Request from ${name}`, // Subject line
      html: `
        <h3>You have a new consultation request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Success response
    res.status(200).json({ message: 'Your consultation request has been sent!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send your consultation request.' });
  }
}
