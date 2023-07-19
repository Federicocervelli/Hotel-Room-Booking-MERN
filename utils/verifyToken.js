import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import booking from "../models/booking.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "You aren't logged in" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin)
      return res.status(403).json({ message: "You aren't an admin" });
    next();
  });
};



