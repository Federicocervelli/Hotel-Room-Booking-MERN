import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import booking from "../models/booking.js";

// Middleware che verifica che l'utente sia loggato analizzando il token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "You aren't logged in" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Middleware che verifica che l'utente sia admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin)
      return res.status(403).json({ message: "You aren't an admin" });
    next();
  });
};



