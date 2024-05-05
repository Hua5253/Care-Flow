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

const getNotifications: RequestHandler = async (request, response, next) => {
  const { userId } = request.query;
  try {
    const user = await UserModel.findById(userId);
    const list = [];
    if (user && user.notifications?.length > 0) {
      for (const notification of user.notifications) {
        if (notification.type === 'message') {
          const notificationUserId = notification.content?.split(':')?.[0];
          if (notificationUserId) {
            const notificationUser = await UserModel.findById(notificationUserId);
            list.push({
              ...notification.toJSON(),
              name: notificationUser?.name,
            })
          }
        } else {
          list.push(notification.toJSON())
        }
      }
    }

    if (user) {
      response.status(200).json(list);
    } else {
      response.status(404).json({ error: "no user found" });
    }
  } catch (error) {
    next(error);
  }
};

const createNotification: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;
  const { sender, content } = request.body;

  if (!sender || !content) {
    return response.status(400).json({ error: "Both sender and content must be defined" });
  }

  const notification = {
    read_status: false,
    type: "message",
    content: `${sender}: ${content}`,
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { notifications: notification } },
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

const updateNotificationsRead: RequestHandler = async (request, response, next) => {
  const { posterId } = request.body;
  try {
    const updateUser = await UserModel.updateMany(
      { 'notifications.content': { $regex: new RegExp(`^${posterId}:`, 'g') } },
      { $set: { 'notifications.$[].read_status': true } },
      { multi: true }
    );

    if (!updateUser) {
      return response.status(404).json({ error: 'User not found.' });
    }
    return response.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
const updateNotification: RequestHandler = async (request, response, next) => {
  const userId = request.params.id;
  const notificationId = request.body.notificationId;


  if (notificationId === undefined) {
    return response.status(400).json({ error: "notificationId must be defined" });
  }

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "notifications._id": notificationId },
      { "$set": { "notifications.$.read_status": true } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return response.status(404).json({ error: "User or Notification not found" });
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

  if (!id) {
    return response
      .status(400)
      .json({ error: "id is required in the request query." });
  }

  try {
    const message = await MessageModel.create({ poster, content });
    const updateChatroom = await ChatModel.findByIdAndUpdate(id, {
      $push: { history: message._id },
    }, { new: true });

    if (!updateChatroom) {
      return response.status(404).json({ error: "Chatroom not found" });
    }

    const chatRoomData = await ChatModel.findById(id);
    if (chatRoomData && chatRoomData.users) {
      for (const userId of chatRoomData.users) {
        if (userId.toString() !== poster) {
          try {
            await UserModel.findByIdAndUpdate(
              { _id: userId },
              {
                $push: {
                  notifications: {
                    read_status: false,
                    type: 'message',
                    content: `${poster}:${message.content}`
                  }
                }
              },
              { new: true, runValidators: true }
            )
          } catch (err) {
            console.log('UserModel findByIdAndUpdate', err)
          }
        }
      }
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


export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getNotifications,
  createNotification,
  updateNotificationsRead,
  updateNotification,
  createChatroom,
  updateChatroom,
  getMessages,
  deleteUser,
};
