import { RequestHandler } from "express";
import PathwayModel from "../models/pathway_schema";

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

const updatePathwayById: RequestHandler = async (request, response, next) => {
  const pathwayId = request.params.id;

  const { name, patient, status, is_template, procedures } = request.body;

  console.log(request.body);

  if (!name)
    return response.status(400).json({ error: "name fields must be provided" });
  if (!patient)
    return response
      .status(400)
      .json({ error: "patient fields must be provided" });
  if (!status)
    return response
      .status(400)
      .json({ error: "status fields must be provided" });
  if (is_template == undefined)
    return response
      .status(400)
      .json({ error: "is_template fields must be provided" });
  if (!procedures)
    return response
      .status(400)
      .json({ error: "procedures fields must be provided" });

  try {
    const updates = { name, patient, status, is_template, procedures };

    console.log(updates);

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

export default {
  createBlankPathway,
  getNotTemplatePathways,
  getPathwayById,
  updatePathwayById,
  deletePathway,
};
