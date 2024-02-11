const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const contactRoutes = require("./router/contactUsRoute");
const userRoutes = require('./router/userRoute');
const connectDb = require("./config/connectionDb");
const errorHandler = require("./errorHandler");

const app = express();

const port = "5000";

app.use(express.json());
app.use("/api/v1/contact-us", contactRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);
app.listen(port, () => {
  connectDb();
  console.log(`server started ${port}`);
});
