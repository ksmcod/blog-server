const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.register = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("All the fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email!");
  }

  const usedUsername = await this.findOne({ username });

  const usedEmail = await this.findOne({ email });

  if (usedUsername) {
    throw Error("This username is already in use!");
  }

  if (usedEmail) {
    throw Error("This email is already in use!");
  }

  const salt = await bcrypt.genSalt(13);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });
  console.log(user);

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("The email or password is incorrect!");
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    throw Error("The email or password is incorrect!");
  }

  return user;
};

userSchema.statics.updateUser = async function (id, username, email, password) {
  const user = await this.findById(id);

  if (username !== "") {
    const usedUsername = await this.findOne({ username });
    if (usedUsername) throw Error("This username is already in use!");
    user.username = username;
  }

  if (email !== "") {
    if (!validator.isEmail(email)) throw Error("Email is invalid");
    const usedEmail = await this.findOne({ email });

    if (usedEmail) throw Error("This email is already in use!");
    user.email = email;
  }

  if (password !== "") {
    const salt = await bcrypt.genSalt(13);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
  }

  const updatedUser = await user.save();
  return updatedUser;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
