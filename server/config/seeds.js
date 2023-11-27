const db = require("./connection");
const { User, Task } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");

  await User.create({
    name: "Pamela Washington",
    email: "pamela@testmail.com",
    password: "password12345",
  });

  await User.create({
    name: "Elijah Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  await cleanDB("Task", "tasks");

  await Task.create({
    title: "Task One",
    priority: 1,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: "Project One",
    createdDate: new Date(),
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Open",
    dueDate: new Date(),
    description: "Task Two Description",
    project: "Project Two",
    createdDate: new Date(),
  });
  await Task.create({
    title: "Task Three",
    priority: 1,
    status: "Open",
    dueDate: new Date(),
    description: "Task Three Description",
    project: "Project One",
    createdDate: new Date(),
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: "Project Two",
    createdDate: new Date(),
  });

  console.log("tasks seeded");

  process.exit();
});
