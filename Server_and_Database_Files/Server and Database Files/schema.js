const { buildSchema } = require("graphql");
const schema = buildSchema(`


type Query {
    projects: [Project]
    members: [Member]
    subtasksbytask: [Subtask]
    tasksbyproject: [Task]
    subtasksbymemberandproject: [Subtask]
    projectbyname: Project
    memberbyname: Member
    taskbyname: Task
    membersbyrole: [Member]
}
type Project{
    projectName: String
    projectDesc: String
    tasks: [Task]
    status: String
}
type Task{
    taskName: String
    subtasks: [Subtask]
    timeRemaining: Int
    status: String
    backlog: [String]
}
type Subtask{
    taskName: String
    timeRemaining: Int
    memberAssigned: Member
    status: String
    comments: String
}
type Member{
    firstName: String
    lastName: String
    roles: [String]
}
type Mutation{
    createProject(
        projectName: String
        projectDesc: String
        tasks: [Task]
        status: String
    ): Project
    createMember(
        firstName: String
        lastName: String
        role: String 
    ): Member
    createTask(
        taskName: String
        subtasks: [Subtask]
        timeRemaining: Int
        status: String
        backlog: [String]
    ): Task
    createSubtask(
        taskName: String
        timeRemaining: Int
        memberAssigned: Member
        status: String
        comments: String
    ): Subtask
    updateProject(
        projectDesc: String
        status: String
    ): Project
    updateTask(
        taskName: String
        subtasks: [Subtask]
        timeRemaining: Int
        status: String
        backlog: [String]
    ):Task
    updateSubtask(
        taskName: String
        timeRemaining: Int
        memberAssigned: Member
        status: String
        comments: String
    ):Subtask
    deleteProject(projectName:String):String
    deleteTask(taskName: String ):String
    deleteSubtask(taskName: String):String
}
`);
module.exports = { schema };
