// admin.model.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
