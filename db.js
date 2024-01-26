const mongoose = require("mongoose");
const express = require("express");
const app = express();

const DB =
  // "mongodb+srv://ashwinmaurya30:royalenamesash@bluesky.v63c1bx.mongodb.net/";
  "mongodb+srv://ashwinmaurya30:kahaanistudio@kahaanistudio.ay2xhgj.mongodb.net/";
const connectToMongo = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => console.log(err + "NO connection"));
};

module.exports = connectToMongo;
