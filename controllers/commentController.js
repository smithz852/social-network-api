const { default: mongoose } = require('mongoose');
const { Thought, Reaction, User } = require('../models');

module.exports = {

  async getAllThoughts(req, res) {
    try {
      const comment = await Thought.find()
      .select('-__v')
        .populate('reaction');
      res.json(comment);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const comment = await Thought.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('reaction');

      if (!comment) {
        return res.status(404).json({ message: 'No comment with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const commentData = await Thought.create({ thoughtText: req.params.thoughtText });
      res.json(commentData);
    } catch (err) {

     if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err)
      return
     } 
      console.log(err)
      res.status(500).json(err);
    }
  },

  async putThought(req, res) {
    try {
      const commentData = await Thought.updateOne(
        { _id: req.params.id },
        req.body,
        {new: true}
        );
      res.json(commentData);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err)
        return
       } 
        console.log(err)
      res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const commentData = await Thought.deleteOne({ _id: req.params.id });
      res.json(commentData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  
};