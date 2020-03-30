const dbRtns = require("./appDbroutines");
const { projectColl, memberColl } = require("./config");
const resolvers = {
  projects: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, projectColl, {}, {});
  },
  projectbyname: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName
    });
  },
  members: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, memberColl, {}, {});
  },
  memberbyname: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, memberColl, {
      firstName: args.firstName,
      lastName: args.lastName
    });
  },
  tasksbyproject: async args => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName
    });
    let taskarray = [];
    project.tasks.forEach(task => {
      if (taskarray.includes(task)) {
      } else {
        taskarray.push(task);
      }
    });
    return taskarray;
  },
  tasksbymemberandproject: async args => {
    let db = await dbRtns.loadDB();
    let member = await dbRtns.findOne(db, memberColl, {
      firstName: args.firstName,
      lastName: args.lastName
    });
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName
    });
    let associatedSubtasks = [];
    project.tasks.forEach(task => {
      task.subTasks.forEach(subTask => {
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
  subtasksbytask: async args => {
    let db = await dbRtns.loadDB();
    let project = await dbRtns.findOne(db, projectColl, {
      projectName: args.projectName
    });
    let subtaskArray = [];
    project.tasks.forEach(task => {
      if (task.taskName === args.taskName) {
        task.subTasks.forEach(subTask => {
          subtaskArray.push(subTask);
        });
      }
    });
    return subtaskArray;
  }
};
module.exports = { resolvers };
