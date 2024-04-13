import { Request, Response } from "express";
import { Users } from "../models/user_model";
import { User } from "../models/user_model";
const loginUser = async (req: Request, res: Response) => {
  console.log("login user");
  console.log(req.body);
  const { username, password } = req.body;

  //find if username is in the database
  let existingUser: User[] | null = Users.filter(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  existingUser = existingUser.length === 0 ? null : existingUser;

  //return error if the username is not in the database
  if (!existingUser) {
    return res.status(401).json({
      errorMsg: "Wrong username or password provided.",
    });
  }

  //compare password
  const passwordCorrect = existingUser[0].password === password;

  if (!passwordCorrect) {
    return res.status(401).json({
      errorMsg: "Wrong username or password provided.",
    });
  }

  //return user when password and username is both verified
  res.status(200).json({
    error: false,
    user: {
      username: existingUser[0].username,
      role: existingUser[0].role,
    },
  });
};
const logoutUser = async (req: Request, res: Response) => {
  console.log("logout user");
  res.json({ error: false });
};
const AuthController = { loginUser, logoutUser };
export default AuthController;
