import express from "express";
import Query from "../models/Query.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const query = new Query(req.body);
    await query.save();
    res.json({ success: true, message: "Query submitted" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


router.get("/", async (req, res) => {
  const data = await Query.find();
  res.json(data);
});

export default router;