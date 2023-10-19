const express = require("express");
const connectToMongo = require("./database");
connectToMongo();
const app = express();
const port = 5000;
const { body, validationResult } = require("express-validator");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Middle ware to parse the request body
app.use(express.json());

// Set middleware of CORS
// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://your-frontend.com"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);

//     next();
//   });

// ROUTE 1; Create a new user using POST : /createuser. No login required.
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
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get the name email and password entered by the user
      const { name, email, password } = req.body;
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with the email already exists" });
      }
      // Generate a secured password hash along with salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      // Create a new user
      user = await User.create({
        name,
        email,
        password: secPass,
      });

      // Generate a user authentication token and send it as response
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "SinmbfLost");
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// ROUTE 2: Authenticate the user using POST : /login. No login required.
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
    try {
      // Get the email and password entered by the user
      const { email, password } = req.body;
      // Check if the credentials entered by the user are correct
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
      // If correct credentials are entered then send a auth Token as response
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "SinmbfLost");
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
