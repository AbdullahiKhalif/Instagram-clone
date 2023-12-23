import chalk from "chalk";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import { jwtSecret, webURL } from "../config/config.js";
import User from "../models/Users.js";
import sendEmailVerificationToken from "../utils/email/sendEmailVerfication.js";
import { generalizationToken } from "../utils/generalization.js";

//getAllUsers

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) return res.status(404).send("Not Found");

    users.password = undefined;

    return res.status(200).send(users);
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR At REading USers")}, ${err}`);
  }
};
export const showOtherUser = async (req, res) => {
  try {
    const excludedUserId = req.user._id;

    const users = await User.find({ _id: { $ne: excludedUserId } }).sort({ createdAt: -1 });
    
    if (!users) return res.status(404).send("Not Found");

    users.password = undefined;

    return res.status(200).send(users);
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR At Reading other USers")}, ${err}`);
  }
};

//regsiter User Account
export const registerUserAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const isUserExist = await User.findOne({
      $or: [
        { email },
        { username },
      ],
    });

    if (isUserExist) {
      if (isUserExist.email == email.toLowerCase()) {
        return res.status(400).send("Email already exists");
      } else if (isUserExist.username == username.toLowerCase()) {
        return res.status(400).send("Username already exists");
      }
    }

    const verificationToken = generalizationToken();

    const expireToken = new Date();
    expireToken.setHours(expireToken.getHours() + 24);

    var result;

    if (req.file) {
      let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
        folder: "users-images",
      });
    }

    const userAccount = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      image: result?.url || null,
      token: verificationToken,
      expireDate: expireToken,
    });

    await userAccount.save();
    userAccount.password = undefined;
    const verificationLink = `${webURL}/users/verify-user?token=${verificationToken}&userId=${userAccount._id}`;
    sendEmailVerificationToken(email, verificationLink);

    return res.status(201).send(userAccount);
  } catch (err) {
    res.status(400).send(err.message);
    console.log(
      `${chalk.red.bold("ERROR AT Register Account ")} ${err.message}`
    );
  }
};

export const verificationUserAccountLink = async (req, res) => {
  try {
    const { token, userId: _id } = req.query;

    const user = await User.findOne({ _id, token });

    if (!user) return res.status(400).send("Invalid Token!");

    const expirationTime = user.expireDate;

    if (!expirationTime || expirationTime < new Date()) {
      return res.status(400).send("Token Has expired!");
    }

    const maxAge = new Date();
    maxAge.setHours(maxAge.getHours() - 24);

    if (expirationTime < maxAge) {
      return res.status(400).send("Token Has expired!");
    }

    user.isEmailConfirmed = true;
    user.token = undefined;
    user.expireDate = undefined;

    await user.save();
    return res
      .status(200)
      .send({
        status: true,
        message: "Successfuly Verified Your User Account✔",
      });
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR AT verify Account ")} ${err.message}`);
  }
};

export const loginUserAccount = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const isUserExists = await User.findOne({
      $or: [
        { email: username?.toLowerCase() },
        { username: username?.toLowerCase() },
      ],
    }).select("+password");

    if (!isUserExists)
      return res.status(403).send("Incorrect username or password!");

    const validPassword = await isUserExists.comparePassword(password);

    if (!validPassword)
      return res.status(403).send("Incorrect username or password!");
    if (!isUserExists.isEmailConfirmed)
      return res.status(403).send("Please Confirm your Email!");
    const expiresIn = 7 * 24 * 60 * 60;
    const token = jwt.sign({ _id: isUserExists._id }, jwtSecret, { expiresIn });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000, // 7 day
    });

    isUserExists.password = undefined;
    return res.status(200).send({ ...isUserExists.toJSON(), expiresIn });
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR AT login Users ")}, ${err}`);
    res.status(400).send(err.message);
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearcookie("token");
    return res.status(200).send("You have logged out successfully");
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR AT logout User ")}, ${err}`);
  }
};

// export const forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const optNumber = Array.from(
//       { length: 4 },
//       () => Math.floor(Math.random() * 100) + 1
//     );

//     const isEmailExist = await User.findOne({ email });
//     if (!isEmailExist)
//       return res
//         .status(404)
//         .send("Invalid email! Please enter a valid email address");
//     if (isEmailExist.opt === undefined) {
//       const user = new User({
//         otp: optNumber,
//       });
//       await user.save();
//       sendForgetPassword(email, optNumber)
//       return res.status(200).send("Go to your gmail account to the opt");
//     }
//     await User.findByIdAndUpdate(req.params.email, {opt: optNumber}, {new: true})
//     sendForgetPassword(email, optNumber)
//     return res.status(200).send("Go to your gmail to the opt");
//   } catch (err) {
//     console.log(`${chalk.red.bold("ERROR AT Forget Password User ")}, ${err}`);
//   }
// };
