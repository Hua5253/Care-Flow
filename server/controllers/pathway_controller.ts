import { RequestHandler } from "express";
import PathwayModel from "../models/pathway_schema";
import ProcedureModel from "../models/procedure_schema";

const createBlankPathway: RequestHandler = async (request, response, next) => {
    const name = request.body.name;
    const patient = request.body.patient;
    const status = request.body.status;
    const is_template = request.body.is_template;
    const procedures = request.body.Procedures;

    if (!name) {
        return response
            .status(400)
            .json({ error: "name is required in the request body." });
    }
    if (!patient) {
        return response
            .status(400)
            .json({ error: "patient is required in the request body." });
    }

    try {
        const newPathway = await PathwayModel.create({
            name: name,
            patient: patient,
            status: status,
            is_template: is_template,
            procedures: procedures,
        });

        response.status(201).json(newPathway);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getNotTemplatePathways: RequestHandler = async (
    request,
    response,
    next
) => {
    try {
        const allPathways = await PathwayModel.find();

        const notTemplatePathways = allPathways.filter(
            pathway => !pathway.is_template
        );

        if (allPathways) {
            response.status(200).json(notTemplatePathways);
        } else {
            response.status(404).json({ error: "no pathways found" });
        }
    } catch (error) {
        next(error);
    }
};

export const getPathwayById: RequestHandler = async (
    request,
    response,
    next
) => {
    console.log(request.params);
    const pathwayId = request.params.id;

    try {
        const pathway = await PathwayModel.findById(pathwayId);

        if (pathway) {
            response.status(200).json(pathway);
        } else {
            response.status(404).json({ error: "no pathways found" });
        }
    } catch (error) {
        next(error);
    }
};

const updatePathway: RequestHandler = async (request, response, next) => {
    const pathwayId = request.params.id;

    const { name, patient, status, is_template, procedures } = request.body;

    if (name && patient && status && is_template && procedures === undefined) {
        return response
            .status(400)
            .json({ error: "all fields must be provided" });
    }

    try {
        const updates = { name, patient, status, is_template, procedures };

        const updatedPathway = await PathwayModel.findByIdAndUpdate(
            pathwayId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedPathway) {
            return response.status(404).json({ error: "Pathway not found" });
        }

        response.status(200).json(updatedPathway);
    } catch (error) {
        next(error);
    }
};

const deletePathway: RequestHandler = async (request, response, next) => {
    const pathwayId = request.params.id;
    try {
        const deletedPathway = await PathwayModel.findByIdAndDelete(pathwayId);

        if (!deletedPathway) {
            return response.status(404).json({ error: "Pathway not found" });
        }

        response.status(200).json(deletedPathway);
    } catch (error) {
        next(error);
    }
};

const createProcedure: RequestHandler = async (request, response, next) => {
    const { name, caregiver, patient, location, status, details, start, end } =
        request.body;

    if (!name) {
        return response
            .status(400)
            .json({ error: "name is required in the request body." });
    }
    if (!caregiver) {
        return response
            .status(400)
            .json({ error: "patient is required in the request body." });
    }
    if (!patient) {
        return response
            .status(400)
            .json({ error: "status is required in the request body." });
    }
    if (!location) {
        return response
            .status(400)
            .json({ error: "caregiver is required in the request body." });
    }
    if (!status) {
        return response
            .status(400)
            .json({ error: "location is required in the request body." });
    }
    if (!details) {
        return response
            .status(400)
            .json({ error: "details is required in the request body." });
    }
    if (!start) {
        return response
            .status(400)
            .json({ error: "start is required in the request body." });
    }
    if (!end) {
        return response
            .status(400)
            .json({ error: "end is required in the request body." });
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

export const getProcedures: RequestHandler = async (
    request,
    response,
    next
) => {
    try {
        const procedures = await ProcedureModel.find();

        if (procedures) {
            response.status(200).json(procedures);
        } else {
            response.status(404).json({ error: "no procedures found" });
        }
    } catch (error) {
        next(error);
    }
};

export const getProceduresById: RequestHandler = async (
    request,
    response,
    next
) => {
    const procedureId = request.params.id;
    try {
        const procedure = await ProcedureModel.findById(procedureId);

        if (procedure) {
            response.status(200).json(procedure);
        } else {
            response.status(404).json({ error: "no procedure found" });
        }
    } catch (error) {
        next(error);
    }
};

const updateProcedure: RequestHandler = async (request, response, next) => {
    const procedureId = request.params.id;

    const { name, caregiver, patient, location, status, details, start, end } =
        request.body;

    if (
        name &&
        caregiver &&
        patient &&
        location &&
        status &&
        details &&
        start &&
        end === undefined
    ) {
        return response
            .status(400)
            .json({ error: "all fields must be provided" });
    }

    try {
        const updates = {
            name,
            caregiver,
            patient,
            location,
            status,
            details,
            start,
            end,
        };

        const updatedProcedure = await ProcedureModel.findByIdAndUpdate(
            procedureId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedProcedure) {
            return response.status(404).json({ error: "procedure not found" });
        }

        response.status(200).json(updatedProcedure);
    } catch (error) {
        next(error);
    }
};

const deleteProcedure: RequestHandler = async (request, response, next) => {
    const procedureId = request.params.id;
    try {
        const deletedProcedure = await ProcedureModel.findByIdAndDelete(
            procedureId
        );

        if (!deletedProcedure) {
            return response.status(404).json({ error: "procedure not found" });
        }

        response.status(200).json(deletedProcedure);
    } catch (error) {
        next(error);
    }
};

export default {
    createBlankPathway,
    getNotTemplatePathways,
    getPathwayById,
    updatePathway,
    deletePathway,
    createProcedure,
    getProcedures,
    getProceduresById,
    updateProcedure,
    deleteProcedure,
};
