const Users = require("./models/users");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ text: `All fields are required` });
    }
    const oldUser = await Users.findOne({ email });
    if (!oldUser) {
      return res.status(409).json({ text: `Email already registered` });
    }
    res.send("login");
  } catch (error) {
    console.log(error);
  }
};
const signController = async (req, res) => {
  try {
    res.send("signup");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { loginController, signController };
