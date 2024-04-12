import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const equipmentSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
})

type Note = InferSchemaType<typeof equipmentSchema>;
export default model<Note>("Equipment",equipmentSchema);