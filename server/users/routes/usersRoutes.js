const express = require("express");
const router = express.Router();
const { register, login, getUsers, getUser, editUser, deleteUser, isBizUser } = require("../controllers/usersController");
const auth = require("../../auth/authService");

router.post("/", register);
router.post("/login", login);
router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);
router.put("/:userId", auth, editUser);
router.delete("/:userId", auth, deleteUser);
router.patch("/:userId", isBizUser);

module.exports = router;
