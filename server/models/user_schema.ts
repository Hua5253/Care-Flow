import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        phone_number: { type: String, required: true },
        role: { type: String, required: true },
        chat_rooms: [
            { type: ObjectId, ref: 'Chat_room' }
        ],
        notifications: [{
            read_status: { type: Boolean },
            type: { type: String },
            content: { type: String }
        }]
    })
type Note = InferSchemaType<typeof userSchema>;
export default model<Note>("User", userSchema);