import { InferSchemaType, model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const equipmentSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  currentQuantity: { type: Number },
  status: { type: String, required: true },
});

equipmentSchema.pre("save", function (next) {
  console.log(this);
  if (this.currentQuantity === undefined || this.currentQuantity === null) {
    this.currentQuantity = this.quantity;
  }
  next();
});

type Note = InferSchemaType<typeof equipmentSchema>;
export default model<Note>("Equipment", equipmentSchema);
