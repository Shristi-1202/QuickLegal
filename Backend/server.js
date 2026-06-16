const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// ================== MONGODB ==================
mongoose.connect("mongodb://127.0.0.1:27017/quicklegal")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ================== NOTARY SCHEMA ==================
const NotarySchema = new mongoose.Schema({
  name: String,
  email: String,
  document: String,
  idProof: String,
  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

const Notary = mongoose.model("Notary", NotarySchema);


// ================== QUERY SCHEMA (UPDATED FINAL) ==================
const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "General",
  },
  issue: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    default: "Pending",
  }
}, { timestamps: true });

const Query = mongoose.model("Query", QuerySchema);


// ================== MULTER ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// ================== OTP STORAGE ==================
let otpStore = {};


// ================== EMAIL SETUP ==================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shristichaurasiya1202@gmail.com",
    pass: "tbkb seeh nvoy yfbv",
  },
});


// ================== SEND OTP ==================
app.post("/api/send-email-otp", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: "shristichaurasiya1202@gmail.com",
      to: email,
      subject: "QuickLegal OTP",
      text: `Your OTP is ${otp}`,
    });

    console.log("OTP sent to:", email);

    res.json({ success: true });

  } catch (err) {
    console.log("OTP Error:", err);
    res.status(500).json({ success: false });
  }
});


// ================== VERIFY OTP ==================
app.post("/api/verify-email-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});


// ================== NOTARY APIs ==================

// CREATE
app.post("/api/notary", upload.fields([
  { name: "document", maxCount: 1 },
  { name: "idProof", maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, email } = req.body;

    const newRequest = new Notary({
      name,
      email,
      document: req.files["document"]?.[0]?.filename || "",
      idProof: req.files["idProof"]?.[0]?.filename || "",
      status: "Pending",
    });

    await newRequest.save();

    res.json({ message: "Saved successfully" });

  } catch (err) {
    console.error("NOTARY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/api/notary", async (req, res) => {
  try {
    const data = await Notary.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/notary/:id", async (req, res) => {
  try {
    await Notary.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE STATUS
app.put("/api/notary/:id", async (req, res) => {
  try {
    const updated = await Notary.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== QUERY APIs ==================

// CREATE QUERY
app.post("/api/query", async (req, res) => {
  try {
    const { name, phone, type, issue } = req.body;

    if (!name || !issue) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const newQuery = new Query({
      name,
      phone,
      type,
      issue,
      solution: "Pending"
    });

    await newQuery.save();

    console.log("Query saved:", newQuery);

    res.json({ success: true });

  } catch (err) {
    console.error("QUERY SAVE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// GET ALL QUERIES
app.get("/api/query", async (req, res) => {
  try {
    const data = await Query.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("QUERY FETCH ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// UPDATE QUERY (ADMIN REPLY)
app.put("/api/query/:id", async (req, res) => {
  try {
    const { solution } = req.body;

    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { solution },
      { new: true }
    );

    console.log("Query updated:", updated);

    res.json(updated);

  } catch (err) {
    console.error("QUERY UPDATE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// ================== SERVER ==================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

