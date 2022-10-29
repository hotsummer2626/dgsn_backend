const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  getUsers() {
    return this.model.find().exec();
  }
  getUserById(id) {
    return this.findOneById(id);
  }
  getUserByUsername(username) {
    return this.model
      .findOne({
        username,
      })
      .exec();
  }
  async saveUserToDatabase({ username, password }) {
    const user = new this.model({ username, password });
    await user.hashPassword();
    return user.save();
  }
}

module.exports = Users;
