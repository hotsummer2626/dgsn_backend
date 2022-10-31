const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Brand {
    _id: ID
    name: String
    imgSrc: String
  }

  type Product {
    _id: ID!
    name: String!
    brand: Brand
    imgSrc: String
    price: String
    expireDate: String
  }

  input CreateProductInput {
    name: String!
    brand: ID!
    imgSrc: String!
    price: String!
    expireDate: String!
  }

  input UpdateProductInput {
    id: ID!
    name: String!
    brand: ID!
    imgSrc: String!
    price: String!
    expireDate: String!
  }

  type Query {
    products: [Product!]
    product(id: ID): Product
  }

  type Mutation {
    createProduct(product: CreateProductInput): Product
    updateProduct(product: UpdateProductInput): Product
    deleteProduct(id: ID): String
  }
`;

module.exports = typeDefs;
