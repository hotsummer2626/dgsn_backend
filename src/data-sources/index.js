const dbModels = require("../models");
const Users = require("./user");
const Brands = require("./brand");
const Products = require("./product");

module.exports = () => {
  return {
    users: new Users(dbModels.User),
    brands: new Brands(dbModels.Brand),
    products: new Products(dbModels.Product),
  };
};
