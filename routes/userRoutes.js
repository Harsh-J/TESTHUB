const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  signUpUser,
  loginUser,
  getUserInfo,
  myUserInfo,
} = require("../controllers/userController");
const { verifyToken } = require("../authenticate");

router.get("/", getAllUsers);

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/myuserinfo", verifyToken, myUserInfo);
router.get("/:id", verifyToken, getUserInfo);


module.exports = router;
