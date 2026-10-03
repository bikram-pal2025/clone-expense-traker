const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["employed", "unemployed", "student"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "",
    },
    number: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
    },

    deleteAt: {
      type: Date,
      default: null,
      index: true,
      expires: 0,
    },
    resetPasswordAllowed: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
