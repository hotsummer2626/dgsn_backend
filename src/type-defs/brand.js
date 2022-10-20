const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Brand {
    _id: ID
    name: String
    imgSrc: String
  }

  input CreateBrandData {
    name: String!
    imgSrc: String!
  }

  input UpdataBrandData {
    id: ID!
    name: String!
    imgSrc: String!
  }

  type Query {
    brands: [Brand!]
  }

  type Mutation {
    createBrand(brand: CreateBrandData): String
    updateBrand(brand: UpdataBrandData): String
    deleteBrand(id: ID): String
  }
`;

module.exports = typeDefs;
