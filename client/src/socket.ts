import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? 'http://3.142.237.164:4000/chatroom' : 'http://localhost:4000/chatroom';

export const socket = io(URL, { forceNew: true, });