const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./type-defs");
const resolvers = require("./resolvers");
const authDirective = require("./schema-directives/auth");

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const applyAuthDirective = authDirective("auth");

schema = applyAuthDirective(schema);

module.exports = schema;
