const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema(
  {
    question_description: {
      type: String,
      required: true,
    },
    options: [
      {
        option_description: String,
        isCorrect: { type: Boolean, default: false },
      },
    ],
    belongTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'test', //refernce to user module  
    }
  },
  { timestamps: true }
);
const Questions = mongoose.model("questions", questionsSchema);

module.exports = Questions;
