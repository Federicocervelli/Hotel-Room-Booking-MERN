import express from "express";
const router = express.Router();
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import moment from "moment";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

router.post("/bookroom", verifyToken, async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.nome,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionid: "abcd",
    });

    const booking = await newBooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.prenotazioni_attuali.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send("Room booked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", verifyToken, async (req, res) => {
  const userid = req.body.userid;
  if (req.user.id !== userid && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You don't have permission to do that" });
  }
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", verifyToken, async (req, res) => {
  const bookingid = req.body.bookingid;
  const bookingtodelete = await Booking.findOne({ _id: bookingid });

  const roomid = bookingtodelete.roomid;
  if (!bookingtodelete) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (req.user.id !== bookingtodelete.userid && !req.user.isAdmin) {
    console.log(req.user.id, bookingtodelete.userid, req.user.isAdmin);
    return res
      .status(403)
      .json({ message: "You don't have permission to do that" });
  }

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.prenotazioni_attuali;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.prenotazioni_attuali = temp;

    await bookingitem.save();
    await room.save();

    res.send("Booking cancelled successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
