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
