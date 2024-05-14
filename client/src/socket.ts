import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:4000/chatroom' : 'http://localhost:4000/chatroom';

export const socket = io(URL, { forceNew: true, });