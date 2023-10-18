const express = require("express");
const connectToMongo = require("./database");
connectToMongo();
const app = express();
const port = 5000;
const { body, validationResult } = require("express-validator");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SinmbfLost";
const fetchUser = require("./middleware/fetchUser");
const cors = require("cors");

// For fixing cors issue
app.options("*", cors());
app.use(
  cors({
    origin: "https://login-signup-frontend-mu.vercel.app",
    optionsSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
// For parsing the request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello sinmbf");
});

// ROUTE 1: Create a new user using POST: /createuser. No login required.
app.post(
  "/createuser",
  [
    body("name", "Please enter a valid name with minimum 3 characters")
      .isLength({ min: 3 })
      .escape(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get the name, email and password entered by the client
      const { name, email, password } = req.body;
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with the same email already exists" });
      }
      // Generate a hash for password along with salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // If the user doesn't exist then create a new one
      user = await User.create({
        name,
        email,
        password: secPass,
      });
      // Generate a user authentication token using json webtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // Send the user authToken as reponse
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// ROUTE 2: Authenitcate the user using POST: /login. No login required
app.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Get email and password entered by the user
    const { email, password } = req.body;
    // Check if the user with the email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    // Check if the password entered by the user matches the one stored in the database
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    // If the email and password are correct then send the user auth token as response
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  }
);

// ROUTE 3: Get user details using POST: /getuser. Login required
app.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
