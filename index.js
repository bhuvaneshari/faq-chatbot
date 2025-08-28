require("dotenv").config();
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Add this for frontend fetch requests

const app = express();
app.use(express.json()); // lets server read JSON body
app.use(cors()); // ✅ allow frontend (HTML) to call API

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err)); // ✅ fixed

const FAQ = require("./models/FAQ");

// Create FAQ
app.post("/faq", async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all FAQs
app.get("/faq", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
