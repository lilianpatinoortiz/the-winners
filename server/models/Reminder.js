const { Schema, model } = require("mongoose");

const reminderSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Reminder = model("Reminder", reminderSchema);
module.exports = Reminder;
