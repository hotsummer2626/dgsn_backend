const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION

  type User {
    _id: ID!
    username: String!
    token: String
  }

  input Input {
    username: String!
    password: String!
  }

  type Query {
    users: [User!] @auth
  }

  type Mutation {
    login(user: Input): User
    createUser(user: Input): User
  }
`;

module.exports = typeDefs;
