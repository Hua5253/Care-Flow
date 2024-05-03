import create from "./http-service";

export interface Pathway {
  _id?: string;
  name: string;
  patient: string;
  status: "ongoing" | "completed" | "waiting" | "unpublished";
  is_template: boolean;
  procedures: string[];
}

export default create("/pathway");
