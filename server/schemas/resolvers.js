

const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const bookSchema = require('../models/Book');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        console.error(context)
      }
      return await User.findOne({_id: context.user._id});
    },
    
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, {bookInput}, context) => {
      if (context.user) {
        return await User.findOneAndUpdate({_id: context.user._id},{$push: {savedBooks: bookInput}}, {new: true} )
        }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate({_id: context.user._id}, {$pull: { savedBooks: bookInput}}, {new: true})
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;