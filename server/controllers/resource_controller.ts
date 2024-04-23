import { RequestHandler } from "express";
import MedicineModel from "../models/medicine_schema";
import RoomModel from "../models/room_schema";
import EquipmentModel from "../models/equipment_schema";

const createRoom: RequestHandler = async (request, response, next) => {
  const name = request.body.name;
  const location = request.body.location;
  const capacity = request.body.capacity;
  const status = request.body.status;
  const schedule = request.body.schedule;

  if (!name) {
    return response
      .status(400)
      .json({ error: "name is required in the request body." });
  }
  if (!location) {
    return response
      .status(400)
      .json({ error: "location is required in the request body." });
  }
  if (!capacity) {
    return response
      .status(400)
      .json({ error: "capacity is required in the request body." });
  }
  if (!status) {
    return response
      .status(400)
      .json({ error: "status is required in the request body." });
  }
  if (!schedule) {
    return response
      .status(400)
      .json({ error: "schedule is required in the request body." });
  }

  try {
    const newRoom = await RoomModel.create({
      name: name,
      location: location,
      capacity: capacity,
      status: status,
      schedule: schedule,
    });

    response.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

export const getRooms: RequestHandler = async (request, response, next) => {
  try {
    const rooms = await RoomModel.find();

    if (rooms) {
      response.status(200).json(rooms);
    } else {
      response.status(404).json({ error: "no rooms found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getRoomById: RequestHandler = async (request, response, next) => {
  const roomId = request.params.id;
  try {
    const room = await RoomModel.findById(roomId);

    if (room) {
      response.status(200).json(room);
    } else {
      response.status(404).json({ error: "no room found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateRoom: RequestHandler = async (request, response, next) => {
  const roomId = request.params.id;

  const { name, location, capacity, status, schedule } = request.body;

  if (name && location && capacity && status && schedule === undefined) {
    return response.status(400).json({ error: "all fields must be provided" });
  }

  try {
    const updates = { name, location, capacity, status, schedule };

    const updatedRoom = await RoomModel.findByIdAndUpdate(
      roomId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return response.status(404).json({ error: "Room not found" });
    }

    response.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom: RequestHandler = async (request, response, next) => {
  const roomId = request.params.id;
  try {
    const deletedRoom = await RoomModel.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return response.status(404).json({ error: "Room not found" });
    }

    response.status(200).json(deletedRoom);
  } catch (error) {
    next(error);
  }
};

const createEquipment: RequestHandler = async (request, response, next) => {
  const name = request.body.name;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const status = request.body.status;

  if (!name) {
    return response
      .status(400)
      .json({ error: "name is required in the request body." });
  }
  if (!category) {
    return response
      .status(400)
      .json({ error: "catagory is required in the request body." });
  }
  if (!quantity) {
    return response
      .status(400)
      .json({ error: "quantity is required in the request body." });
  }
  if (!status) {
    return response
      .status(400)
      .json({ error: "status is required in the request body." });
  }

  try {
    const newEquipment = await EquipmentModel.create({
      name: name,
      category: category,
      quantity: quantity,
      status: status,
    });

    response.status(201).json(newEquipment);
  } catch (error) {
    next(error);
  }
};

export const getEquipments: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const equipments = await EquipmentModel.find();

    if (equipments) {
      response.status(200).json(equipments);
    } else {
      response.status(404).json({ error: "no equipments found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getEquipmentById: RequestHandler = async (
  request,
  response,
  next
) => {
  const equipmentId = request.params.id;
  try {
    const equipment = await EquipmentModel.findById(equipmentId);

    if (equipment) {
      response.status(200).json(equipment);
    } else {
      response.status(404).json({ error: "no equipment found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateEquipment: RequestHandler = async (request, response, next) => {
  const equipmentId = request.params.id;

  const { name, category, quantity } = request.body;

  if (name && category && quantity === undefined) {
    return response.status(400).json({ error: "all fields must be provided" });
  }

  try {
    const updates = { name, category, quantity };

    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
      equipmentId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEquipment) {
      return response.status(404).json({ error: "Equipment not found" });
    }

    response.status(200).json(updatedEquipment);
  } catch (error) {
    next(error);
  }
};

const deleteEquipment: RequestHandler = async (request, response, next) => {
  const equipmentId = request.params.id;
  try {
    const deletedEquipment = await EquipmentModel.findByIdAndDelete(
      equipmentId
    );

    if (!deletedEquipment) {
      return response.status(404).json({ error: "Equipment not found" });
    }

    response.status(200).json(deletedEquipment);
  } catch (error) {
    next(error);
  }
};

const createMedicine: RequestHandler = async (request, response, next) => {
  const name = request.body.name;
  const catagory = request.body.category;
  const usage = request.body.usage;
  const packaging = request.body.packaging;
  const quantity = request.body.quantity;

  if (!name) {
    return response
      .status(400)
      .json({ error: "name is required in the request body." });
  }
  if (!catagory) {
    return response
      .status(400)
      .json({ error: "catagory is required in the request body." });
  }
  if (!usage) {
    return response
      .status(400)
      .json({ error: "usage is required in the request body." });
  }
  if (!packaging) {
    return response
      .status(400)
      .json({ error: "packaging is required in the request body." });
  }
  if (!quantity) {
    return response
      .status(400)
      .json({ error: "quantity is required in the request body." });
  }

  try {
    const newMedicine = await MedicineModel.create({
      name: name,
      catagory: catagory,
      usage: usage,
      packaging: packaging,
      quantity: quantity,
    });

    response.status(201).json(newMedicine);
  } catch (error) {
    next(error);
  }
};

export const getMedicines: RequestHandler = async (request, response, next) => {
  try {
    const medicines = await MedicineModel.find();

    if (medicines) {
      response.status(200).json(medicines);
    } else {
      response.status(404).json({ error: "no medicines found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getMedicineById: RequestHandler = async (
  request,
  response,
  next
) => {
  const medicineId = request.params.id;
  try {
    const medicine = await MedicineModel.findById(medicineId);

    if (medicine) {
      response.status(200).json(medicine);
    } else {
      response.status(404).json({ error: "no medicine found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateMedicine: RequestHandler = async (request, response, next) => {
  const medicineId = request.params.id;

  const { name, category, usage, packaging, quantity } = request.body;

  if (name && category && usage && packaging && quantity === undefined) {
    return response.status(400).json({ error: "all fields must be provided" });
  }

  try {
    const updates = { name, category, usage, packaging, quantity };

    const updatedMedicine = await MedicineModel.findByIdAndUpdate(
      medicineId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return response.status(404).json({ error: "Equipment not found" });
    }

    response.status(200).json(updatedMedicine);
  } catch (error) {
    next(error);
  }
};

const deleteMedicine: RequestHandler = async (request, response, next) => {
  const medicineId = request.params.id;
  try {
    const deletedMedicine = await MedicineModel.findByIdAndDelete(medicineId);

    if (!deletedMedicine) {
      return response.status(404).json({ error: "Medicine not found" });
    }

    response.status(200).json(deletedMedicine);
  } catch (error) {
    next(error);
  }
};

export default {
  createRoom,
  updateRoom,
  getRooms,
  getRoomById,
  deleteRoom,
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
