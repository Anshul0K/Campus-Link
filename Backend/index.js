const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send("Campus Link Backend is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
