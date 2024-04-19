import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const medicineSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    usage: {type: String, required: true},
    packaging: {type: String},
    quantity: {type: Number, required: true},
})

type Note = InferSchemaType<typeof medicineSchema>;
export default model<Note>("Medicine",medicineSchema );