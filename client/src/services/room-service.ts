import create from "./http-service";

export interface Room {
  _id?: string;
  name: string;
  location: string;
  currentCapacity: number;
  capacity: number;
  status: string;
}

export default create("/resource/room");
