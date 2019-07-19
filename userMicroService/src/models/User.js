const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, "mipassword");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
