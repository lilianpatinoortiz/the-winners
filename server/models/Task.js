const { Schema, model } = require("mongoose");
const Reminder = require("./Reminder");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2,
  },
  status: {
    type: String,
    required: true,
    default: "Open",
    enum: ["Open", "In Progress", "Completed"],
  },
  reminders: [Reminder.schema],
});

const Task = model("Task", taskSchema);
module.exports = Task;
