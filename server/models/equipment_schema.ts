import { InferSchemaType, model, Schema, UpdateQuery } from "mongoose";

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

equipmentSchema.pre("findOneAndUpdate", async function (next) {
  const item = await this.model.findOne(this.getQuery()).exec();
  if (!item) {
    return next(new Error("Document not found"));
  }
  const currentQuantity = item.currentQuantity;
  const inUse = item.quantity - currentQuantity;
  console.log("in use: ", inUse);

  const update = this.getUpdate() as UpdateQuery<any>;
  console.log("update: ", update);
  if (update.$set) {
    const fields = update.$set;
    if (fields.quantity && !fields.status) {
      console.log(
        "Manager changed quantity but did not change status: ",
        fields.quantity
      );

      let newQuantity = Number(fields.quantity);
      update.$set.currentQuantity = newQuantity - inUse;

      const ratio = inUse / newQuantity;

      let status;
      if (ratio == 0) {
        status = "All Available";
      } else if (ratio < 1) {
        status = "Some Available";
      } else {
        status = "All in Use";
      }
      update.$set.status = status;
    }
  }
  next();
});

type Note = InferSchemaType<typeof equipmentSchema>;
export default model<Note>("Equipment", equipmentSchema);
