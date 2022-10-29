const { UserInputError } = require("apollo-server-express");
const { generateToken } = require("../utils/jwt");

const resolvers = {
  Query: {
    async users(parent, args, context) {
      const { dataSources } = context;
      const users = await dataSources.users.getUsers();
      return users;
    },
    async user(parent, { id }, { dataSources }) {
      const user = await dataSources.users.getUserById(id);
      if (!user) {
        throw new UserInputError("User not existed");
      }
      return user;
    },
  },

  Mutation: {
    async createUser(
      parent,
      { user: { username, password } },
      { dataSources }
    ) {
      const user = await dataSources.users.getUserByUsername(username);
      if (user) {
        throw new UserInputError("User already existed");
      }
      const newUser = await dataSources.users.saveUserToDatabase({
        username,
        password,
      });
      return newUser;
    },
    async login(parent, { user: { username, password } }, { dataSources }) {
      const user = await dataSources.users.getUserByUsername(username);
      if (!user) {
        throw new UserInputError("User not existed");
      }
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        throw new UserInputError("Username or password incorrect");
      }
      const token = await generateToken({ id: user._id });
      return { ...user.toObject(), token };
    },
  },
};

module.exports = resolvers;
