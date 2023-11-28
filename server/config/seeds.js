const db = require("./connection");
const { User, Task, Project } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");

  const users = await User.insertMany([
    {
      name: "Mark Carlson",
      email: "admin@admin.com",
      password: "$2b$10$GKo/VCDWFu5ZMqCHcTTQjOlCnijQph8/2c6C8vxck.QjTXDEg9UkO",
    },
    {
      name: "Test User",
      email: "test@test.com",
      password: "$2b$10$GKo/VCDWFu5ZMqCHcTTQjOlCnijQph8/2c6C8vxck.QjTXDEg9UkO",
    },
  ]);

  console.log("users seeded");

  await cleanDB("Project", "projects");

  today = new Date();

  const projects = await Project.insertMany([
    {
      title: "Project One",
      description: "Project One Description",
      createdDate: new Date(),
      dueDate: today.setDate(today.getDate() + 1),
      userid: users[0]._id,
    },
    {
      title: "Project Two",
      description: "Project Two Description",
      createdDate: new Date(),
      dueDate: today.setDate(today.getDate() + 2),
      userid: users[0]._id,
    },
    {
      title: "Project Three",
      description: "Project Three Description",
      createdDate: new Date(),
      dueDate: today.setDate(today.getDate() + 3),
      userid: users[0]._id,
    },
    {
      title: "Project Four",
      description: "Project Four Description",
      createdDate: new Date(),
      dueDate: today.setDate(today.getDate() + 4),
      userid: users[0]._id,
    },
  ]);

  console.log("projects seeded");

  await cleanDB("Task", "tasks");

  today = new Date();

  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Finished",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[0].title,
    createdDate: today.setDate(today.getDate() + 1),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Finished",
    dueDate: today.setDate(today.getDate() + 20),
    description: "Task Two Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: new Date(),
    description: "Task Three Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Open",
    dueDate: today.setDate(today.getDate() + 13),
    description: "Task Two Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: new Date(),
    description: "Task Three Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Finished",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "In Progress",
    dueDate: new Date(),
    description: "Task Two Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: today.setDate(today.getDate() + 100),
    description: "Task Three Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Finished",
    dueDate: new Date() + 2,
    description: "Task Four Description",
    project: projects[3].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[3].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "In Progress",
    dueDate: new Date(),
    description: "Task Two Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "In Progress",
    dueDate: today.setDate(today.getDate() + 1),
    description: "Task Three Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "In Progress",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Finished",
    dueDate: today.setDate(today.getDate() + 20),
    description: "Task Two Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: new Date(),
    description: "Task Three Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Open",
    dueDate: today.setDate(today.getDate() + 13),
    description: "Task Two Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[1]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: new Date(),
    description: "Task Three Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[1]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[0].title,
    createdDate: new Date(),
    userid: users[1]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "In Progress",
    dueDate: new Date(),
    description: "Task Two Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[1]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: today.setDate(today.getDate() + 100),
    description: "Task Three Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date() + 2,
    description: "Task Four Description",
    project: projects[3].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task One",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task One Description",
    project: projects[3].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Two",
    priority: 1,
    status: "Open",
    dueDate: new Date(),
    description: "Task Two Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });
  await Task.create({
    title: "Task Three",
    priority: 2,
    status: "Open",
    dueDate: today.setDate(today.getDate() + 1),
    description: "Task Three Description",
    project: projects[1].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  await Task.create({
    title: "Task Four",
    priority: 3,
    status: "Open",
    dueDate: new Date(),
    description: "Task Four Description",
    project: projects[2].title,
    createdDate: new Date(),
    userid: users[0]._id,
  });

  console.log("tasks seeded");

  process.exit();
});
