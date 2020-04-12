const { port, graphql } = require("./config");
const express = require("express");
const myroutes = require("./serverroutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const app = express();
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
app.use("/setup", myroutes);
app.use(cors());
app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.use(express.static("public"));
app.listen(port);
console.log(`Server ready on localhost:${port}`);
