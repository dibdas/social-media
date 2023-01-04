const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ text: `All fields are required` });
    }
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ text: `Email already registered` });
    }
    // bcrypt.hash(data you would like to hash, saltrounds)
    // once you encode the password it cant be decoded
    // bcrypt is an async function
    const hashedPassword = await bcrypt.hash(password, 9);

    // it can also be done by doing like Users.save() instead

    // const user = await Users.create({
    //   email,
    //   password: hashedPassword,
    // });
    // OR
    const creatingUser = new Users({
      email,
      password: hashedPassword,
    });
    const user = await creatingUser.save();
    return res.status(201).json({ user });
    res.send("signup");
  } catch (error) {
    console.log(error);
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ text: `all fields required` });
    }
    const user = await Users.findOne({ email });
    console.log(user); // whole user data is coming not only email and password fields
    if (!user) {
      res.status(404).json({ text: `email does not exist` });
    }
    // cont userPassword
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res.status(404).json({ text: `incorrect password` });
    }
    // generating the access token ,as email and password got matched and they are ok
    // inside the generateAccesstoken can pass anything here passing email and id
    const accessToken = generateAccessToken({
      email: user.email,
      _id: user._id,
    });
    // console.log(accessToken);
    return res.status(200).json({ user: `${user}`, token: `${accessToken}` });
    res.send("signup");
  } catch (error) {
    console.log(error);
  }
};

// internal functions, which is not  for exporting
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
  // return token;
};
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
  // return token;
};
module.exports = { loginController, signupController };
