const express = require("express");
const {
  getCards,
  getCard,
  createCard,
  getMyCards,
  editCard,
  likeCard,
  deleteCard,
} = require("../controllers/cardsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/", getCards);
router.get("/my-cards", auth, getMyCards);
router.get("/:cardId", getCard);
router.post("/", auth, createCard);
router.put("/:cardId", auth, editCard);
router.patch("/:cardId", auth, likeCard);
router.delete("/:cardId", auth, deleteCard);

module.exports = router;
