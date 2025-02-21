const Reaction = require("../models/Reaction");

exports.addReaction = async (req, res) => {
  try {
    const reaction = await Reaction.create(req.body);
    res.status(201).json(reaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReactions = async (req, res) => {
  try {
    const reactions = await Reaction.find({ article_id: req.params.article_id });
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
