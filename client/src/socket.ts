import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? 'https://care-flow.vercel.app/chatroom' : 'http://localhost:4000/chatroom';

export const socket = io(URL, { forceNew: true, });