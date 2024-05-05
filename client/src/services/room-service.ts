import create from "./http-service";

export interface Room {
  _id?: string;
  name: string;
  location: string;
  capacity: number;
  currentCapacity?: number;
  status: string;
}

export default create("/resource/room");
