import { RequestHandler } from "express";
import PathwayModel from '../models/pathway_schema';
import ProcedureModel from '../models/procedure_schema';

const createPathway: RequestHandler = async (request, response, next) => {
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

const updatePathway: RequestHandler = async (request, response, next) => {
    const pathwayId = request.params.pathwayId; 

    const { name, patient, status, is_template, procedures } = request.body;

    if (name && patient && status && is_template && procedures === undefined) {
        return response.status(400).json({ error: 'all fields must be provided' });
    }

    try {
        const updates = { name, patient, status, is_template, procedures};


        const updatedPathway = await PathwayModel.findByIdAndUpdate(
            pathwayId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedPathway) {
            return response.status(404).json({ error: 'Pathway not found' });
        }

        response.status(200).json(updatedPathway);
    } catch (error) {
        next(error);
    }
};

const deletePathway: RequestHandler = async (request, response, next) => {
    const pathwayId = request.params.pathwayId; 
    try {
        const deletedPathway = await PathwayModel.findByIdAndDelete(
            pathwayId
        );

        if (!deletedPathway) {
            return response.status(404).json({ error: 'Pathway not found' });
        }

        response.status(200).json(deletedPathway);
    } catch (error) {
        next(error);
    }
};

const createProcedure: RequestHandler = async (request, response, next) => {
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

export default {
    createPathway,
    updatePathway,
    deletePathway,
    createProcedure,
}