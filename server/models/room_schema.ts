import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const roomSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    capacity: {type: Number, required: true},
    status: {type: String, required: true},
    schedule: [{
            start: {type: Date, required: true},
            end: {type: Date, required: true}
     }]
})

type Note = InferSchemaType<typeof roomSchema>;
export default model<Note>("Room",roomSchema);