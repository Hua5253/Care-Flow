import create from "./http-service";
import { User } from "./user-service";

export interface Procedure {
    id: string;
    name: string;
    caregiver?: User[];
    patient: string;
    status: "ongoing" | "completed" | "waiting";
    location: string;
    details: string;
    start: Date;
    end: Date;
}

export default create("/procedure");