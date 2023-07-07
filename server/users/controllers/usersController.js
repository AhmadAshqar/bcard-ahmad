const { generateAuthToken, verifyToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const loginValidation = require("../models/joi/loginValidation");
const registerValidation = require("../models/joi/registerValidation");
const User = require("../models/mongoose/User");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");

    const normalizedUser = normalizeUser(user);

    const userForBD = new User(normalizedUser);
    const userFromDB = await userForBD.save();
    res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const MAX_FAILED_ATTEMPTS = 3;
    const BLOCK_DURATION = 86400000;

    const user = req.body;
    const { email, password, idToken } = user;
    const { error } = loginValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDb = await User.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: Invalid email or password");

    const isPasswordValid = comparePassword(password, userInDb.password);
    if (!isPasswordValid) {
      const failedAttempts = global.failedAttempts || {};
      failedAttempts[email] = failedAttempts[email] ? failedAttempts[email] + 1 : 1;
      if (failedAttempts[email] >= MAX_FAILED_ATTEMPTS) {
        setTimeout(() => {
          delete failedAttempts[email];
        }, BLOCK_DURATION);

        throw new Error("Authentication Error: Too many failed attempts. Please try again later.");
      }

      global.failedAttempts = failedAttempts;

      throw new Error("Authentication Error: Invalid email or password");
    }
    global.failedAttempts = {};

    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });

    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";

    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};



const getUsers = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { isAdmin } = user;
    if (isAdmin) {
      const users = await User.find().sort({ createdAt: "descending" });
      return res.send(users);
    }} catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { _id } = user;

    const userFromDB = await User.findOne({ _id: userId });
    if (!userFromDB)
      throw new Error("Could not find user with that id");

    if (_id === userFromDB._id.toString() || !userFromDB.isAdmin) {
      return res.send(userFromDB);
    } else {
      throw new Error("User does not have permission to access this user's information");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { _id } = user;
    const userFromDB = await User.findOne({ _id: userId });

    if (_id === userFromDB._id.toString()) {
      const userUpdated = await User.findByIdAndUpdate(userId, req.body, { new: true });

      if (!userUpdated)
        throw new Error("Could not find user with that id");

      return res.send(userUpdated);
    } else {
      throw new Error("User does not have permission to edit this user");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const isBizUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { _id } = user;
    const userFromDB = await User.findOne({ _id: userId });

    if (_id === userFromDB._id.toString() || user.isAdmin === true) {
      const userUpdated = await User.findByIdAndUpdate(userId, { isBusiness: !userFromDB.isBusiness }, { new: true });

      if (!userUpdated)
        throw new Error("Could not find user with that id");

      return res.send(userUpdated);
    } else {
      throw new Error("User does not have permission to edit this user");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};





const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.header("x-auth-token");
    const user = verifyToken(token);
    const { _id } = user;
    const userFromDB = await User.findOne({ _id: userId });
    
    if (_id === userFromDB._id.toString() || !!userFromDB.isAdmin) {
      const userToDelete = await User.findByIdAndDelete(userId);

      if (!userToDelete)
        throw new Error("Could not find user with that id");

      return res.send("User has been successfully deleted");
    } else {
      throw new Error("User does not have permission to delete this user");
    }
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};


exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.isBizUser = isBizUser;
