require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");



mongoose.connect(
  `mongodb+srv://vivek:${process.env.MONGODB_PASSWORD}@cluster0-va8yu.mongodb.net/phorekka?retryWrites=true&w=majority
  `,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to mongodb database phorekka");
  }
);

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

// Routes

app.use("/api/v1/user", require("./Routes/user"));
app.use("/api/v1/profile", require("./Routes/profile"));
app.use("/api/v1/address", require("./Routes/address"));
app.use("/api/v1/product", require("./Routes/product"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("error: ", err);
  res.send(err.message);
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    let url = path.join(__dirname, "client/build", "index.html");
    if (!url.startsWith("/app/"))
      // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });
}

// Starting the server
const port = process.env.PORT || 9122;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
