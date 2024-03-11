// create model for users *****
const { default: mongoose } = require('mongoose');
const { User } = require('../models');

module.exports = {

  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      .select('-__v')
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async postUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {

     if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err)
      return
     } 
      console.log(err)
      res.status(500).json(err);
    }
  },

  async putUser(req, res) {
    try {
      const userData = await User.updateOne(
        { _id: req.params.id },
        req.body,
        {new: true}
        );
      res.json(userData);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err)
        return
       } 
        console.log(err)
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const userData = await User.deleteOne({ _id: req.params.id });
      res.json(userData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  
};