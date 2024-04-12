import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const chatRoomSchema = new Schema({
    history: [{type: ObjectId, ref: 'Message'}],
    users: [{type: ObjectId, ref: 'User'}]
})

type Note = InferSchemaType<typeof chatRoomSchema>;
export default model<Note>("Chat_room",chatRoomSchema);