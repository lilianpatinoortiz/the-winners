const { Schema, model } = require("mongoose");

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
    min: 1,
    max: 3,
  },
  status: {
    type: String,
    required: true,
    default: "Open",
    enum: ["Open", "In Progress", "Finished"],
  },
  project: {
    type: String,
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = model("Task", taskSchema);
module.exports = Task;
