const dotenv = require("dotenv");
dotenv.config();

//setup export constants
module.exports = {
  atlas: process.env.DBURL,
  projectColl: process.env.Coll1,
  memberColl: process.env.Coll2,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
  appdb: process.env.DB,
};
