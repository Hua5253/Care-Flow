import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const procedureSchema = new Schema(
    {
        name: {type: String, required: true}, 
        caregiver: [{type: ObjectId, ref: 'User', required: true}],
        patient: {type: String, required: true}, 
        status: {type: String, required: true},
        location: {type: String, required: true},
        details: {type: String, required: true},        
        start: {type: Date, required: true},     
        end: {type: Date, required: true},          
    })
type Note = InferSchemaType<typeof procedureSchema>;
export default model<Note>("Procedure", procedureSchema);