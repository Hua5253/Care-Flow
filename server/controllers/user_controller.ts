import { RequestHandler, response } from "express";
import UserModel from "../models/user_schema";
import ChatModel from "../models/chatroom_schema";
import MessageModel from "../models/message_schema";
import bcrypt from "bcrypt";
const saltRound = 10;

const createUser: RequestHandler = async (request, response, next) => {
  const name = request.body.name;
  const username = request.body.username;
  const password = request.body.password;
  const email = request.body.email;
  const phone_number = request.body.phone_number;
  const role = request.body.role;

  if (!name) {
    return response
      .status(400)
      .json({ error: "name is required in the request body." });
  }
  if (!username) {
    return response
      .status(400)
      .json({ error: "username is required in the request body." });
  }
  if (!password) {
    return response
      .status(400)
      .json({ error: "password is required in the request body." });
  }
  if (!email) {
    return response
      .status(400)
      .json({ error: "email is required in the request body." });
  }
  if (!phone_number) {
    return response
      .status(400)
      .json({ error: "phone_number is required in the request body." });
  }
  if (!role) {
    return response
      .status(400)
      .json({ error: "role is required in the request body." });
  }
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);

  try {
    const newPathway = await UserModel.create({
      name: name,
      username: username,
      password: hash,
      email: email,
      phone_number: phone_number,
      role: role,
    });

    response.status(201).json(newPathway);
  } catch (error) {
    next(error);
  }
};

const getUsers: RequestHandler = async (request, response, next) => {
  const { name } = request.query;
  try {
    const nameRegex = new RegExp(name as string, 'i');
    const users = name ? await UserModel.find({ name: nameRegex }) : await UserModel.find();

    if (users) {
      response.status(200).json(users.map(i => ({ id: i._id, ...i.toJSON() })));
    } else {
      response.status(404).json({ error: "no users found" });
    }
  } catch (error) {
    next(error);
  }
};

const getUserById: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;
  try {
    const user = await UserModel.findById(userId);

    if (user) {
      response.status(200).json({ ...user.toJSON(), id: user._id });
    } else {
      response.status(404).json({ error: "no user found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;

  const { name, username, password, email, phone_number, role } = request.body;

  if (
    name &&
    username &&
    password &&
    email &&
    phone_number &&
    role === undefined
  ) {
    return response.status(400).json({ error: "all fields must be provided" });
  }

  try {
    const updates = { name, username, password, email, phone_number, role };

    if (password) {
      const salt = await bcrypt.genSalt(saltRound);
      const hash = await bcrypt.hash(password, salt);
      updates.password = hash;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return response.status(404).json({ error: "User not found" });
    }

    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const updateNotifications: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;

  const { notification } = request.body;

  if (notification === undefined) {
    return response.status(400).json({ error: "notificaiton must be defined" });
  }

  try {
    const updates = { notification };

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return response.status(404).json({ error: "User not found" });
    }

    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;
  try {
    const user = await UserModel.findOneAndDelete({ _id: userId });
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createChatroom: RequestHandler = async (request, response, next) => {
  const users = request.body.users;

  if (!users) {
    return response
      .status(400)
      .json({ error: "users is required in the request body." });
  }

  try {
    const oldChatroom = await ChatModel.find({ users });
    if (oldChatroom && oldChatroom[0]) {
      response.status(201).json(oldChatroom[0]._id);
    } else {
      const newChatroom = await ChatModel.create({
        users: users,
      });
      response.status(201).json(newChatroom._id);
    }
  } catch (error) {
    next(error);
  }
};

const updateChatroom: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  const { message } = request.body;

  if (!id || !message) {
    return response.status(400).json({ error: "all fields must be provided" });
  }

  try {
    const updateChatroom = await ChatModel.findByIdAndUpdate(id, {
      $push: { history: message },
    }, { new: true });

    if (!updateChatroom) {
      return response.status(404).json({ error: "Chatroom not found" });
    }

    response.status(200).json(updateChatroom);
  } catch (error) {
    next(error);
  }
};

const getMessages: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const chatRoom = await ChatModel.findById(id).populate("history");

    if (chatRoom) {
      response.status(200).json(chatRoom.history);
    } else {
      response.status(404).json({ error: "Chatroom not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createMessage: RequestHandler = async (request, response, next) => {
  const { poster, content } = request.body;

  if (!poster) {
    return response
      .status(400)
      .json({ error: "poster is required in the request body." });
  }

  if (!content) {
    return response
      .status(400)
      .json({ error: "content is required in the request body." });
  }

  try {
    const message = await MessageModel.create({
      poster,
      content
    });
    response.status(201).json(message._id);
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateNotifications,
  createChatroom,
  updateChatroom,
  getMessages,
  deleteUser,
  createMessage
};
