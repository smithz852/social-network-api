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
    thoughts: [
      {
        type: Schema.Types.ObjectId, 
         ref: 'thought',
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

userSchema
.virtual('friendCount')
.get(function() {
  let friendLength = this.friends.length
  return friendLength
})

const User = model('user', userSchema);

module.exports = User;