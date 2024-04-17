import create from "./http-service";
import { Procedure } from "./procedure-service";

export interface Pathway {
    _id: string;
    name: string;
    patient: string;
    status: "ongoing" | "completed" | "waiting" | "unpublished";
    is_template: boolean;
    procedures?: Procedure[];
}

export default create("/pathway");
