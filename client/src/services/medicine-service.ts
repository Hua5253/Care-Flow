import create from "./http-service";

export interface Medicine {
  _id?: string;
  name: string;
  category: string;
  usage: string;
  packaging: string;
  quantity: number;
}

export default create("/resource/medicine");
