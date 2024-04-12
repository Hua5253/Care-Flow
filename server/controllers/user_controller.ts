import { RequestHandler, response } from "express";
import UserModel from "../models/user_schema";
import ChatModel from "../models/chatroom_schema";



export const creatUser: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    const phone_number = request.body.phone_number;
    const role = request.body.role;

    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!username) {
        return response.status(400).json({ error: 'username is required in the request body.' });
    }
    if (!password) {
        return response.status(400).json({ error: 'password is required in the request body.' });
    }
    if (!email) {
        return response.status(400).json({ error: 'email is required in the request body.' });
    }
    if (!phone_number) {
        return response.status(400).json({ error: 'phone_number is required in the request body.' });
    }
    if (!role) {
        return response.status(400).json({ error: 'role is required in the request body.' });
    }

    try {
        const newPathway = await UserModel.create({
            name: name,
            username: username,
            password: password,
            email: email,
            phone_number: phone_number,
            role: role,
        });

        response.status(201).json(newPathway);
    } catch (error) {
        next(error);
    }
};

export const getUsers: RequestHandler = async (request, response, next) => {
    try {
        const users = await UserModel.find();

        if (users) {
            response.status(200).json(users);
        } else {
            response.status(404).json({ error: 'no users found' });
        }


    } catch (error) {
        next(error);
    }
};

export const getUserById: RequestHandler = async (request, response, next) => {
    const userId = request.params.userId; 
    try {
        const user = await UserModel.findById(userId);

        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({ error: 'no user found' });
        }

    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async (request, response, next) => {
    const userId = request.params.userId; 

    const { name, username, password, email, phone_number, role} = request.body;

    if (name && username && password && email && phone_number && role === undefined) {
        return response.status(400).json({ error: 'all fields must be provided' });
    }

    try {
        const updates = { name, username, password, email, phone_number, role};

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ error: 'User not found' });
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};


export const updateNotifications: RequestHandler = async (request, response, next) => {
    const userId = request.params.userId; 

    const { notification} = request.body;

    if (notification === undefined) {
        return response.status(400).json({ error: 'notificaiton must be defined' });
    }

    try {
        const updates = {notification};

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ error: 'User not found' });
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const createChatroom: RequestHandler = async (request, response, next) => {
    const users = request.body.users;

    if (!users) {
        return response.status(400).json({ error: 'users is required in the request body.' });
    }

    try {
        const newChatroom = await ChatModel.create({
            users: users,
        });

        response.status(201).json(newChatroom);
    } catch (error) {
        next(error);
    }
};


export const updateChatroom: RequestHandler = async (request, response, next) => {
    const chatroomId = request.params.chatroomId; 
    const message = request.body.message;

    if (chatroomId && message === undefined) {
        return response.status(400).json({ error: 'all fields must be provided' });
    }

    try {
        const updateChatroom = await ChatModel.findByIdAndUpdate(
            chatroomId,
            { 
                $push: {history: message}
            },
        );

        if (!updateChatroom) {
            return response.status(404).json({ error: 'Chatroom not found' });
        }

        response.status(200).json(updateChatroom);
    } catch (error) {
        next(error);
    }
};

export const getMessages: RequestHandler = async (request, response, next) => {
    const chatroomId = request.params.chatroomId; 
    try {
        const chatRoom = await ChatModel.findById(chatroomId).populate('history');

        if (chatRoom) {
            response.status(200).json(chatRoom.history);
        } else {
            response.status(404).json({ error: 'Chatroom not found' });
        }

    } catch (error) {
        next(error);
    }
};