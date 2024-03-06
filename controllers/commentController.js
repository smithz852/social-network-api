// create model for comments *****
const Comments = require('../models/Comment');

module.exports = {

  async getAllComments(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneComment(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('posts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async postComment(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async putComment(req, res) {
    try {
      const userData = await User.updateOne({ _id: req.params.userId });
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteComment(req, res) {
    try {
      const userData = await User.deleteOne({ _id: req.params.userId });
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};