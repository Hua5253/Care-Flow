import { RequestHandler, response } from "express";
import PathwayModel from '../models/pathway_schema';
import ProcedureModel from '../models/procedure_schema';
import MedicineModel from '../models/medicine_schema';
import RoomModel from '../models/room_schema';
import EquipmentModel from '../models/equipment_schema';


export const creatPathway: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const patient = request.body.patient;
    const status = request.body.status;
    const is_template = request.body.is_template;

    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!patient) {
        return response.status(400).json({ error: 'patient is required in the request body.' });
    }
    if (!status) {
        return response.status(400).json({ error: 'status is required in the request body.' });
    }
    if (!is_template) {
        return response.status(400).json({ error: 'is_template is required in the request body.' });
    }
    try {
        const newPathway = await PathwayModel.create({
            name: name,
            patient: patient,
            status: status,
            is_template: is_template,
        });

        response.status(201).json(newPathway);
    } catch (error) {
        next(error);
    }
};

export const creatProcedure: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const caregiver = request.body.caregiver;
    const patient = request.body.patient;
    const location = request.body.location;
    const status = request.body.status;
    const details = request.body.details;
    const start = request.body.start;
    const end = request.body.end;


    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!patient) {
        return response.status(400).json({ error: 'patient is required in the request body.' });
    }
    if (!status) {
        return response.status(400).json({ error: 'status is required in the request body.' });
    }
    if (!caregiver) {
        return response.status(400).json({ error: 'caregiver is required in the request body.' });
    }
    if (!location) {
        return response.status(400).json({ error: 'location is required in the request body.' });
    }
    if (!details) {
        return response.status(400).json({ error: 'details is required in the request body.' });
    }
    if (!start) {
        return response.status(400).json({ error: 'start is required in the request body.' });
    }
    if (!end) {
        return response.status(400).json({ error: 'end is required in the request body.' });
    }

    try {
        const newProcedure = await ProcedureModel.create({
            name: name,
            caregiver: caregiver,
            patient: patient,
            location: location,
            status: status,
            details: details,
            start: start,
            end: end,
        });

        response.status(201).json(newProcedure);
    } catch (error) {
        next(error);
    }
};

export const createRoom: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const location = request.body.location;
    const capacity = request.body.capacity;
    const status = request.body.status;
    const schedule = request.body.schedule;

    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!location) {
        return response.status(400).json({ error: 'location is required in the request body.' });
    }
    if (!capacity) {
        return response.status(400).json({ error: 'capacity is required in the request body.' });
    }
    if (!status) {
        return response.status(400).json({ error: 'status is required in the request body.' });
    }
    if (!schedule) {
        return response.status(400).json({ error: 'schedule is required in the request body.' });
    }

    try {
        const newRoom = await RoomModel.create({
            name: name,
            location: location,
            capacity: capacity,
            status: status,
            schedule: schedule
        });

        response.status(201).json(newRoom);
    } catch (error) {
        next(error);
    }
};

export const createEquipment: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const catagory = request.body.category;
    const quantity = request.body.quantity;

    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!catagory) {
        return response.status(400).json({ error: 'catagory is required in the request body.' });
    }
    if (!quantity) {
        return response.status(400).json({ error: 'quantity is required in the request body.' });
    }

    try {
        const newEquipment = await EquipmentModel.create({
            name: name,
            catagory: catagory,
            quantity: quantity
        });

        response.status(201).json(newEquipment);
    } catch (error) {
        next(error);
    }
};

export const createMedicine: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const catagory = request.body.category;
    const usage = request.body.usage;
    const packaging = request.body.packaging;
    const quantity = request.body.quantity;

    if (!name) {
        return response.status(400).json({ error: 'name is required in the request body.' });
    }
    if (!catagory) {
        return response.status(400).json({ error: 'catagory is required in the request body.' });
    }
    if (!usage) {
        return response.status(400).json({ error: 'usage is required in the request body.' });
    }
    if (!packaging) {
        return response.status(400).json({ error: 'packaging is required in the request body.' });
    }
    if (!quantity) {
        return response.status(400).json({ error: 'quantity is required in the request body.' });
    }

    try {
        const newMedicine = await MedicineModel.create({
            name: name,
            catagory: catagory,
            usage: usage,
            packaging: packaging,
            quantity: quantity
        });

        response.status(201).json(newMedicine);
    } catch (error) {
        next(error);
    }
};