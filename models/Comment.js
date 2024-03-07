const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 128,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    // getter method to format timestamp?
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema({
  reactionId: {
    id: ObjectId,
    default: new ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // getter method to format timestamp
  }
})

const User = model('user', userSchema);

module.exports = User;