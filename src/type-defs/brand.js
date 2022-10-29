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
    brand(id: ID): Brand!
  }

  type Mutation {
    createBrand(brand: CreateBrandData): Brand
    updateBrand(brand: UpdataBrandData): Brand
    deleteBrand(id: ID): String
  }
`;

module.exports = typeDefs;
