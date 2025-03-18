const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a simple Mongoose schema
const DataSchema = new mongoose.Schema({
  message: String,
});

const DataModel = mongoose.model("Data", DataSchema);

// API Endpoint - Fetch data
app.get("/api/data", async (req, res) => {
  const data = await DataModel.find();
  res.json(data);
});

// API Endpoint - Add data
app.post("/api/data", async (req, res) => {
  const newData = new DataModel({ message: req.body.message });
  await newData.save();
  res.json({ success: true, data: newData });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
