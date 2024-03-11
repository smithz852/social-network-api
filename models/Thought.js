const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Schema.Types.ObjectId()
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
}, {_id: false});

const thoughtSchema = new Schema(
  {
    thoughtText: {
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
    user: [
      {
        type: Schema.Types.ObjectId, 
         ref: 'user',
      },
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const Thought = model('Thought', thoughtSchema);
// const Reaction = model('reaction', reactionSchema)

module.exports = Thought;