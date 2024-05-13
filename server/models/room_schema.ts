import { InferSchemaType, model, Schema, UpdateQuery } from "mongoose";

const roomSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentCapacity: { type: Number },
  status: { type: String, required: true },
  schedule: [
    {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  ],
});

roomSchema.pre("save", function (next) {
  console.log(this);
  if (this.currentCapacity === undefined || this.currentCapacity === null) {
    this.currentCapacity = this.capacity;
  }
  next();
});

roomSchema.pre("findOneAndUpdate", async function (next) {
  const item = await this.model.findOne(this.getQuery()).exec();
  if (!item) {
    return next(new Error("Document not found"));
  }
  const currentCapacity = item.currentCapacity;
  const inUse = item.capacity - currentCapacity;

  const update = this.getUpdate() as UpdateQuery<any>;
  if (update.$set) {
    const fields = update.$set;
    if (fields.capacity && !fields.status) {
      console.log(
        "Manager changed capacity but did not change status: ",
        fields.capacity
      );

      let newCapacity = Number(fields.capacity);
      // if (newCapacity < inUse) {
      //   // update.$set.capacity = item.capacity;
      //   // newCapacity = item.capacity;
      //   return next(
      //     new Error(
      //       "Cannot set capacity lower than the number of rooms currently in use"
      //     )
      //   );
      // } else {
      //   update.$set.currentCapacity = newCapacity - inUse;
      // }
      update.$set.currentCapacity = newCapacity - inUse;

      const ratio = inUse / newCapacity;

      let status;

      if (ratio === 0) {
        status = "Vacant";
      } else if (ratio <= 0.25) {
        status = "Low Occupancy";
      } else if (ratio <= 0.5) {
        status = "Moderate Occupancy";
      } else if (ratio <= 0.75) {
        status = "High Occupancy";
      } else if (ratio < 1) {
        status = "Near Capacity";
      } else {
        status = "Full Capacity";
      }
      update.$set.status = status;
    }
  }
  next();
});
type Note = InferSchemaType<typeof roomSchema>;
export default model<Note>("Room", roomSchema);
