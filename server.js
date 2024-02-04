const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const contactRoutes = require("./router/contactUsRoute");
const connectDb = require("./config/connectionDb");

const app = express();

const port = "5000";

app.use(bodyParser.json());

app.use("/api/v1/contact-us", contactRoutes);

app.listen(port, () => {
  connectDb();
  console.log(`server started ${port}`);
});
