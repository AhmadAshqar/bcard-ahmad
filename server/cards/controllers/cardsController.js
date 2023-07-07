const { verifyToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const validateCard = require("../models/joi/validateCard");
const Card = require("../models/mongoose/Card");
const chalk = require("chalk")

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: "descending" });
    return res.send(cards);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const getMyCards = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const userId =  verifyToken(token)
    const {_id} = userId
    const cards = await Card.find({ user_id: _id });
    return res.send(cards);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const editCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const token = req.header("x-auth-token");
    const userId = verifyToken(token);
    const { _id } = userId;
    const cardFromDB = await Card.findOne({ _id: cardId });
    
    if (_id === cardFromDB.user_id.toString()) {
      const card = await Card.findByIdAndUpdate(cardId, req.body, { new: true });

      if (!card)
        throw new Error("Could not find card with that id");

      return res.send(card);
    } else {
      throw new Error("User does not have permission to edit this card");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const token = req.header("x-auth-token");
    const userId = verifyToken(token);
    const { _id } = userId;
    const cardFromDB = await Card.findOne({ _id: cardId });
    
    if (_id === cardFromDB.user_id.toString() || !!!cardFromDB.isAdmin) {
      const card = await Card.findByIdAndDelete(cardId);

      if (!card)
        throw new Error("Could not find card with that id");

      return res.send("Card Has Been Deleted Successfull");
    } else {
      throw new Error("User does not have permission to delete this card");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { _id } = user;
    const userId = _id

    let card = await Card.findById(cardId);
    if (!card)
    throw new Error("Could not find card with that id");
    
    const cardLikes = card.likes.find(id => id === userId);
    
    if (!cardLikes) {
      card.likes.push(userId);
      card = await card.save();
      return res.send(card);
    } else {
      const cardFiltered = card.likes.filter(id => id !== userId);
      card.likes = cardFiltered;
      card = await card.save();
      return res.send(card);
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};


const getCard = async (req, res) => {
  try {
    const { cardId } = req.params
    const card = await Card.findOne({ _id: cardId });
    if (!card)
      throw new Error("Could not find card with that id")
    return res.send(card);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};


const createCard = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to create a new business card"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = normalizeCard(card, user._id);

    const cardToDB = new Card(normalizedCard);
    const cardFromDB = await cardToDB.save();
    res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};



exports.getCards = getCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.getMyCards = getMyCards;
exports.editCard = editCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
