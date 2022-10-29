const { MongoDataSource } = require("apollo-datasource-mongodb");

class Brands extends MongoDataSource {
  getBrands() {
    return this.model.find().exec();
  }
  getBrandById(id) {
    return this.findOneById(id);
  }
  getBrandByName(name) {
    return this.model.findOne({ name }).exec();
  }
  saveBrandToDatabase({ name, imgSrc }) {
    const brand = new this.model({ name, imgSrc });
    return brand.save();
  }
  getBrandAndUpate({ id, name, imgSrc }) {
    return this.model
      .findByIdAndUpdate(id, { name, imgSrc }, { new: true })
      .exec();
  }
  getBrandAndDelete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

module.exports = Brands;
