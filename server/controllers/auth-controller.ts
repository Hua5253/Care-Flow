import { Request, Response } from "express";
import { Users } from "../models/user_model";
import { User } from "../models/user_model";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import UserModel from "../models/user_schema";

const loginUser = async (req: Request, res: Response) => {
  console.log("login user");
  console.log(req.body);
  const { username, password } = req.body;


  const loginUser = await UserModel.findOne({ 
    username: username 
    }).exec();
  
  if(!loginUser) {
    console.error("user not found");
    return res.status(401).json({
      errorMsg: "Wrong username or password provided.",
    });
  }

  const correctPassword = await bcrypt.compare(password, loginUser.password);
  // let correctPassword = (password == loginUser.password)
  if(correctPassword) {
    const token = jwt.sign({
      user: loginUser._id
    }, process.env.JWT_SECRET || ":r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w;");
  
    console.log("jwt token", token);
  
    res.cookie("token", token, {
      httpOnly: true
    }).status(200).json({
      error: false,
      user: loginUser
    }).send();
  }else{
    return res.status(401).json({
      errorMsg: "Wrong username or password provided.",
    });
  }

};

const logoutUser = async (req: Request, res: Response) => {
  console.log("logout user");
  res.cookie("token","",{
    httpOnly: true,
    expires: new Date(0)
  })
  .json({ error: false });
};

const loggedIn = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET || ":r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w;");

    res.send(true);
  } catch (error) {
    res.json(false);
  }
}

const AuthController = { loginUser, logoutUser, loggedIn};
export default AuthController;
