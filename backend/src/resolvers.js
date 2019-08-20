const User = require('./User')

module.exports = {
  Query: {
    users: () => User.find(), // Pode retornar uma promise
    user: (_, { id }) => User.findById(id)
  },

  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    deleteUser: (_, { id }) => User.findByIdAndDelete(id)
  }
}
