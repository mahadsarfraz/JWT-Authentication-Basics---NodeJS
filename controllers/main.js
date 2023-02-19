const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // Dummy ID
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ message: "User Created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user.username);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    message: `Hello, ${req.user.username}`,
    secret: `Here is your data ${req.user.username} , your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
