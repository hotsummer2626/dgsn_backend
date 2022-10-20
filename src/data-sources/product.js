const { MongoDataSource } = require("apollo-datasource-mongodb");

class Products extends MongoDataSource {
  getProducts() {
    return this.model.find().populate("brand").exec();
  }
  getProductByName(name) {
    return this.model.findOne({ name }).exec();
  }
  getProductById(id) {
    return this.model.findById(id).populate("brand").exec();
  }
  saveProductToDatabase({ name, brand, imgSrc, price, expireDate }) {
    const product = new this.model({ name, brand, imgSrc, price, expireDate });
    return product.save();
  }
  getProductAndUpdate({ id, name, brand, imgSrc, price, expireDate }) {
    return this.model
      .findByIdAndUpdate(
        id,
        { name, brand, imgSrc, price, expireDate },
        { new: true }
      )
      .populate("brand")
      .exec();
  }
  getProductAndDelete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

module.exports = Products;
