const dbRtns = require("./appDbroutines");
const { projectColl, memberColl } = require("./config");

const resolvers = {
  projects: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, projectColl, {}, {});
  },
  projectbyname: async (args) => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
  },
  members: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, memberColl, {}, {});
  },
  memberbyname: async (args) => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, memberColl, {
      firstName: args.firstName,
      lastName: args.lastName,
    });
  },
  membersbyrole: async (args) => {
    let db = await dbRtns.loadDB();
    let members = await dbRtns.findAll(db, memberColl, {}, {});
    let memberArray = [];
    members.forEach((member) => {
      member.roles.forEach((role) => {
        if (role === args.role) {
          memberArray.push(member);
        }
      });
    });
    return memberArray;
  },
  tasksbyproject: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let taskarray = [];
    project.tasks.forEach((task) => {
      if (taskarray.includes(task)) {
      } else {
        taskarray.push(task);
      }
    });
    return taskarray;
  },
  subtasksbymemberandproject: async (args) => {
    let db = await dbRtns.loadDB();
    let member = await dbRtns.findOne(db, memberColl, {
      firstName: args.firstName,
      lastName: args.lastName,
    });
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let associatedSubtasks = [];
    project.tasks.forEach((task) => {
      task.subtasks.forEach((subTask) => {
        if (
          subTask.member.firstName === member.firstName &&
          subTask.member.lastName === member.lastName
        ) {
          associatedSubtasks.push(subTask);
        }
      });
    });
    return associatedSubtasks;
  },
  subtasksbytask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let subtaskArray = [];
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
        task.subtasks.forEach((subTask) => {
          subtaskArray.push(subTask);
        });
      }
    });
    return subtaskArray;
  },
  taskbyname: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
        return task;
      }
    });
  },
  createMember: async (args) => {
    let db = await dbRtns.loadDB();
    let object = {
      firstName: args.firstName,
      lastName: args.lastName,
      role: args.role,
    };
    let results = await dbRtns.addOne(db, memberColl, object);
    return results.insertedCount === 1 ? object : null;
  },
  createProject: async (args) => {
    let db = await dbRtns.loadDB();
    let object = {
      projectName: args.projectName,
      projectDesc: args.projectDesc,
      tasks: [],
      status: "Open",
    };
    let results = await dbRtns.addOne(db, projectColl, object);
    return results.insertedCount === 1 ? object : null;
  },
  createTask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let taskarray = project.tasks;
    let object = {
      taskName: args.taskName,
      taskDesc: args.taskDesc,
      subtasks: [],
      timeRemaining: args.timeRemaining,
      status: "Open",
      backlog: [`${args.taskName} created on ${args.date}`],
    };
    taskarray.push(object);
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: taskarray }
    );
    return results.updatedCount === 1 ? object : null;
  },
  createSubtask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let tasks = project.tasks;
    var point = 0;
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
      } else point++;
    });
    let object = {
      taskName: args.subtaskName,
      timeRemaining: args.timeRemaining,
      memberAssigned: args.memberAssigned,
      status: "Open",
      comments: "",
    };
    tasks[point].subtasks.push(object);
    tasks[point].backlog.push(`${object.taskName} created on ${args.date}`);
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: tasks }
    );
    return results.updatedCount === 1 ? object : null;
  },
  updateProject: async (args) => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      { projectName: args.projectName },
      { projectDesc: args.projectDesc, status: args.status }
    );
    return results.updatedCount === 1 ? "Project Updated" : null;
  },
  updateTask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let tasks = project.tasks;
    var point = 0;
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
      } else point++;
    });
    let pBacklog = tasks[point].backlog;
    pBacklog.push(`${args.taskNameNew} edited on ${args.date}.`);
    let object = {
      taskName: args.taskNameNew,
      timeRemaining: args.timeRemaining,
      subtasks: tasks[point].subtasks,
      status: args.status,
      backlog: pBacklog,
    };
    tasks[point] = object;
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: tasks }
    );
    return results.updatedCount === 1 ? object : null;
  },
  updateSubtask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let mainTask;
    let tasks = project.tasks;
    var point = 0;
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
        mainTask = task;
      } else point++;
    });
    var point2 = 0;
    mainTask.subtasks.forEach((subtask) => {
      if (subtask.taskName === args.subtaskName) {
      } else point2++;
    });
    let object = {
      taskName: args.subtaskNameNew,
      timeRemaining: args.timeRemaining,
      memberAssigned: args.memberAssigned,
      status: args.status,
      comments: args.comments,
    };
    tasks[point].subtasks[point2] = object;
    tasks[point].backlog.push(`${object.taskName} edited on ${args.date}.`);
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: tasks }
    );
    return results.updatedCount === 1 ? object : null;
  },
  deleteProject: async (args) => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      { projectName: args.projectName },
      { projectDesc: args.projectDesc, status: args.status }
    );
    return results.deletedCount === 1 ? "Project Deleted" : null;
  },
  deleteTask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let tasks = [];
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
      } else tasks.push(task);
    });
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: tasks }
    );
    return results.updatedCount === 1 ? "Task Deleted" : null;
  },
  deleteSubtask: async (args) => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName,
    });
    let mainTask;
    let tasks = project.tasks;
    var point = 0;
    project.tasks.forEach((task) => {
      if (task.taskName === args.taskName) {
        mainTask = task;
      } else point++;
    });
    let subtaskArray = [];
    mainTask.subtasks.forEach((subtask) => {
      if (subtask.taskName === args.subtaskName) {
      } else subtaskArray.push(subtask);
    });
    tasks[point].subtasks = subtaskArray;
    tasks[point].backlog.push(`${args.subtaskName} deleted on ${args.date}.`);
    let results = await dbRtns.updateOne(
      db,
      projectColl,
      {
        projectName: args.projectName,
      },
      { tasks: tasks }
    );
    return results.updatedCount === 1 ? "Subtask deleted" : null;
  },
};
module.exports = { resolvers };
