import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const pathwaySchema = new Schema(
    {
        name: {type: String, required: true}, 
        patient: {type: String, required: true}, 
        status: {type: String, required: true},
        is_template: {type: Boolean, required: true},  
        procedures: [{type: ObjectId, ref: 'Procedure'}]
     
    })
type Note = InferSchemaType<typeof pathwaySchema>;
export default model<Note>("Pathway", pathwaySchema);