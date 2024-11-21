const express = require("express");
const { signup, login, getCurrentUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getCurrentUser);

module.exports = router;
