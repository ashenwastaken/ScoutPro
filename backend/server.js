const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require('mongoose'); // Import Mongoose
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Connect to MongoDB using Mongoose
const dbURI = process.env.MONGO_URI || "mongodb+srv://hrana988:K1onIgvERqGBx3gP@cluster0.xpxxo.mongodb.net/scoutpro?retryWrites=true&w=majority"; // Use your MongoDB URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB!");

      // Start the server after successful connection
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(error => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process if DB connection fails
    });
