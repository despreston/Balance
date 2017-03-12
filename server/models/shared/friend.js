/**
 * Friend of a user
 */
module.export = {
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'requested', 'accepted']
  }
};