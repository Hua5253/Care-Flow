import create from "./http-service";

export interface Procedure {
  _id?: string;
  posterId?: string;
  name: string;
  caregiver?: string[];
  patient: string;
  status: "ongoing" | "completed" | "waiting" | "canceled" | "unpublished";
  location: string;
  details: string;
  start: Date;
  end: Date;
}

export default create("/procedure");
