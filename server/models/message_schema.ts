import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const messageSchema = new Schema(
    {
        poster: { type: ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        time: { type: Date, required: true, default: Date.now },
    })
type Note = InferSchemaType<typeof messageSchema>;
export default model<Note>("Message", messageSchema);