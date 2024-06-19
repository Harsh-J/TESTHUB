const User = require("../models/user");
const { getToken, verifyToken } = require("../authenticate");

async function getAllUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}
async function signUpUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //   throw new Error("Please provide all the fields");
    // }
    //find if user is already present
    const alreadyPresentUser = await User.findOne({ username });
    console.log(alreadyPresentUser);
    if (alreadyPresentUser) {
      throw new Error("User is already registered!!");
    }
    const user = {
      username: username,
      email: email,
      password: password,
    };
    const result = await User.create(user);
    if (result) {
      res.send({ status: "User registered successfully", user: user });
    } else {
      throw new Error("there was some problem");
    }
  } catch (err) {
    res.send({ Error: err });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send("Please provide all the fields");
  }
  //find if user is already present
  const alreadyPresentUser = await User.findOne({ username });
  if (!alreadyPresentUser) {
    res.send("User is not registered!! Please signup!!");
  }

  //generate a token
  const token = getToken(alreadyPresentUser);
  //token recieved
  res.send({ status: "Login successfull!!", token: token });
}

async function getUserInfo(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("please provide the id!!");
    }
    const user_with_id = await User.findOne({ _id: id });
    if (!user_with_id) {
      throw new Error("User with this is id not found!!");
    }
    res.send(user_with_id);
  } catch (err) {
    res.send(err);
  }
}
async function myUserInfo(req, res) {
  try {
    const curr_user_Id = "1234";
    if (!curr_user_Id) {
      throw new Error("please provide the id!!");
    }
    const user_with_id = await User.findOne({ _id: curr_user_Id });
    if (!user_with_id) {
      throw new Error("User with this is id not found!!");
    }
    res.send(user_with_id);
  } catch (err) {
    res.send(err);
  }
}
module.exports = {
  getAllUsers,
  signUpUser,
  loginUser,
  getUserInfo,
  myUserInfo,
};
