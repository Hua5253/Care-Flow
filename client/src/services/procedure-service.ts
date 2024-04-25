import create from "./http-service";

export interface Procedure {
  _id?: string;
  name: string;
  caregiver?: string[];
  patient: string;
  status: "ongoing" | "completed" | "waiting";
  location: string;
  details: string;
  start: Date;
  end: Date;
}

export default create("/procedure");
