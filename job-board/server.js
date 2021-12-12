const express = require("express");
const job = require("./routes/job.js");
const user = require("./routes/user.js");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Setup MongoDB Connection
const mongoString = "mongodb://127.0.0.1:27017";
mongoose.connect(mongoString, { useNewUrlParser: true });

const mongoDB = mongoose.connection;

mongoDB.on(
  "error",
  console.error.bind(console, "Error connecting to MongoDB:")
);

const app = express();

// app.use(session({secret: "SUPER_DUPER_SECRET"}));
// app.use(
//   session({
//     secret: "SUPER_DUPER_SECRET",
//     store: MongoStore.create({ mongoUrl: mongoString }),
//   })
// );

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/job", job);
app.use("/api/user", user);

app.get("/banana", (req, res) => {
  res.send("NOT BANANA!");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(process.env.PORT || 8000, () => {
//   console.log("Starting server");
// });

app.listen(8000, () => {
  console.log("Starting server");
});
