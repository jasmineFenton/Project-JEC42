const { projectColl, memberColl } = require("./config");
const dbLib = require("./appDbRoutines");
let db;
let results = "";
let allProjects = [];
let allMembers = [];

const getProjects = async () => {
  try {
    allProjects = await dbLib.findAll(db, projectColl, {}, {});
    results += `${allProjects.length} projects found.`;
  } catch {
    results += "Project list retrieval failed!";
  }
};
const getMembers = async () => {
  try {
    allMembers = await dbLib.findAll(db, memberColl, {}, {});
    results += `${allMembers.length} members found.`;
  } catch {
    results += "Member list retrieval failed!";
  }
};
const setup = async () => {
  try {
    db = await dbLib.loadDB();
    results += `Database loaded successfully.`;
    await getMembers();
    await getProjects();
  } catch (err) {
    console.log(err);
  } finally {
    return results;
  }
};
module.exports = { setup };
