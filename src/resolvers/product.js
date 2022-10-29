const { UserInputError } = require("apollo-server-express");

const resolvers = {
  Query: {
    async products(parent, args, context) {
      const { dataSources } = context;
      const products = await dataSources.products.getProducts();
      return products;
    },
    async product(parent, { id }, { dataSources }) {
      const product = await dataSources.products.getProductById(id);
      if (!product) {
        throw new UserInputError("Product not existed");
      }
      return product;
    },
  },
  Mutation: {
    async createProduct(
      parent,
      { product: { name, brand, imgSrc, price, expireDate } },
      { dataSources }
    ) {
      const product = await dataSources.products.getProductByName(name);
      if (product) {
        throw new UserInputError("Product already existed");
      }
      let newProduct = await dataSources.products.saveProductToDatabase({
        name,
        brand,
        imgSrc,
        price,
        expireDate,
      });
      newProduct = await dataSources.products.getProductById(newProduct._id);
      return newProduct;
    },
    async updateProduct(
      parent,
      { product: { id, name, brand, imgSrc, price, expireDate } },
      { dataSources }
    ) {
      const product = await dataSources.products.getProductAndUpdate({
        id,
        name,
        brand,
        imgSrc,
        price,
        expireDate,
      });
      if (!product) {
        throw new UserInputError("Product not existed");
      }
      const newProduct = await dataSources.products.getProductById(product._id);
      return newProduct;
    },
    async deleteProduct(parent, { id }, { dataSources }) {
      const product = await dataSources.products.getProductAndDelete(id);
      if (!product) {
        throw new UserInputError("Product not existed");
      }
      return "SUCCESS";
    },
  },
};

module.exports = resolvers;
