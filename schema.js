const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project]
    members: [Member]
    subtasksbytask: [Subtask]
    tasksbyproject: [Task]
    subtasksbymemberandproject: [Subtask]
    projectbyname: Project,
    memberbyname: Member
}
type Project{
    projectName: String
    projectDesc: String
    tasks: [Task]
    status: String
}
type Task{
    taskName: String
    taskDesc: String
    subTasks: [Subtask]
    timeRemaining: Integer
    status: String
}
type Subtask{
    taskName: String
    taskDesc: String
    timeRemaining: Integer
    memberAssigned: Member
    status: String
}
type Member{
    firstName: String
    lastName: String
    role: String
}
`);
module.exports = { schema };
