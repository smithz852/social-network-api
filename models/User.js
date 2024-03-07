const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(txt) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(txt)
        },
        message: emailEntered => `${emailEntered.value} is not a valid email!`
      }
    },
    comments: [
      {
        type: Schema.Types.ObjectId, 
         ref: 'comment',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, 
         ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;