const { UserInputError } = require("apollo-server-express");

const resolvers = {
  Query: {
    async brands(parent, args, context) {
      const { dataSources } = context;
      const brands = await dataSources.brands.getBrands();
      return brands;
    },
    async brand(parent, { id }, { dataSources }) {
      const brand = await dataSources.brands.getBrandById(id);
      if (!brand) {
        throw new UserInputError("Brand not existed");
      }
      return brand;
    },
  },
  Mutation: {
    async createBrand(parent, { brand: { name, imgSrc } }, { dataSources }) {
      const brand = await dataSources.brands.getBrandByName(name);
      if (brand) {
        throw new UserInputError("Brand already existed");
      }
      const newBrand = await dataSources.brands.saveBrandToDatabase({
        name,
        imgSrc,
      });
      return newBrand;
    },
    async updateBrand(
      parent,
      { brand: { id, name, imgSrc } },
      { dataSources }
    ) {
      const brand = await dataSources.brands.getBrandAndUpate({
        id,
        name,
        imgSrc,
      });
      if (!brand) {
        throw new UserInputError("Brand not existed");
      }
      return brand;
    },
    async deleteBrand(parent, { id }, { dataSources }) {
      const products = await dataSources.products.getProducts();
      if (products.length !== 0) {
        const brandIdlist = products.reduce(
          (prev, curr) =>
            prev.includes(curr.brand._id.toString())
              ? prev
              : [...prev, curr.brand._id.toString()],
          []
        );
        if (brandIdlist.includes(id)) {
          throw new UserInputError(
            "The brand has been associated with one or more products and cannot be deleted"
          );
        }
      }
      const brand = await dataSources.brands.getBrandAndDelete(id);
      if (!brand) {
        throw new UserInputError("Brand not existed");
      }
      return "SUCCESS";
    },
  },
};

module.exports = resolvers;
