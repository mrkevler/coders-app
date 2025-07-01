
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let uri = process.env.MONGODB_URI;

const connection = mongoose.connect(uri);

connection
  .then(() => {
    console.log("Initialization complete");
  })
  .catch((error) => {
    console.log("Something went wrong with the initialization");
    console.log(error.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + uri);
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose default connection error: " + error.message);
});

mongoose.connection.on("disconnected", (error) => {
  console.log("Mongoose default connection disconnected");
});

export default uri;
