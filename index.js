const express = require("express");
const bodyParser=require('body-parser')
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");

const mongo_url = process.env.MONGO_URI;
const dbConnection = connectDB(mongo_url).then(() => {
  console.log("mongodb connected successfully");
});

const PORT = process.env.PORT;
console.log('before bp')
app.use(bodyParser.json())
console.log('after bp')
app.use("/api/users", userRoutes);
app.use("/api/test",testRoutes)
app.listen(PORT, () => {
  console.log(`Server is up and running @ ${PORT}`);
});
