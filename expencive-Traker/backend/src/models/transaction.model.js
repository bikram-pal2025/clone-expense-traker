const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

   

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catecory",
      required: true,
    },



   
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model(
  "Transaction",
  transactionSchema
);

module.exports = transactionModel;