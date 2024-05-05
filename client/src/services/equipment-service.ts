import create from "./http-service";

export interface Equipment {
  _id?: string;
  name: string;
  category: string;
  quantity: number;
  currentQuantity?: number;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "On Order";
}

export default create("/resource/equipment");
