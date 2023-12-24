import Users from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create Users
export const CreateUsers = async (req, res) => {
  const { name, email, password, confirmPassword, gender } = req.body;

  if (!name || !email || !password || !confirmPassword || !gender) {
    return res.status(400).json({ message: "Required fill all" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password do not match!!" });
  }

  //validate if user already
  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exist!" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      gender: gender,
    });
    res.status(201).json({ msg: "Create Account Successfully!" });
  } catch (error) {
    console.error("Failed to create account:", error);
    res.status(500).json(error, { msg: "Create Account Failed!" });
  }
};

// Login

export const Login = async (req, res) => {
  //mencari email di database
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    //Match password database dan yg di input user
    //Create and Generate Access Token For User
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const gender = user[0].gender;
    const accessToken = jwt.sign(
      { userId, name, email, gender },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, gender },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  await Users.update(
    { refresh_token: null },
    {
      where: {
        refresh_token: refreshToken,
      },
    }
  );

  res.clearCookie("refreshToken");
  res.json({ message: "Logout Success" });
};

//Get All Users
export const GetUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "gender"],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
