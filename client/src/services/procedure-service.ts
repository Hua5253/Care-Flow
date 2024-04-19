import create from "./http-service";
import { User } from "./user-service";

export interface Procedure {
  _id?: string;
  name: string;
  caregiver?: User[];
  patient: string;
  status: "ongoing" | "completed" | "waiting";
  location: string;
  detail: string;
  start: Date;
  end: Date;
}

export default create("/procedure");
