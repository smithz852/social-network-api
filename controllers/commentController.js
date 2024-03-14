const { default: mongoose } = require('mongoose');
const { Thought, Reaction } = require('../models');

module.exports = {

  async getAllThoughts(req, res) {
    try {
      const comment = await Thought.find()
      .select('-__v')
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
        // .populate('reaction');

      if (!comment) {
        return res.status(404).json({ message: 'No comment with that ID' });
      }

      res.json(comment);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const commentData = await Thought.create(req.body)
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

  async postReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { new: true }        
      );
      res.json(reactionData)
    } catch (err) {

     if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err)
      return
     } 
      console.log(err)
      res.status(500).json(err);
    }
  },
  
 async removeReaction(req, res) {
  try {
    const reactionData = await Reaction.deleteOne({ reactionId: req.params.reactionId });
    res.json(reactionData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
 }

};