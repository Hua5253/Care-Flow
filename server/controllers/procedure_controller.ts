import { RequestHandler } from "express";
import ProcedureModel from "../models/procedure_schema";
import UserModel from "../models/user_schema";

const createProcedure: RequestHandler = async (request, response, next) => {
  const { posterId, name, caregiver, patient, location, status, details, start, end } =
    request.body;

  if (!name) {
    return response
      .status(400)
      .json({ error: "name is required in the request body." });
  }
  if (!caregiver) {
    return response
      .status(400)
      .json({ error: "caregiver is required in the request body." });
  }
  if (!patient) {
    return response
      .status(400)
      .json({ error: "patient is required in the request body." });
  }
  if (!location) {
    return response
      .status(400)
      .json({ error: "location is required in the request body." });
  }
  if (!status) {
    return response
      .status(400)
      .json({ error: "status is required in the request body." });
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

    if (caregiver && caregiver.length > 0) {
      for (const userId of caregiver) {
        const user = await UserModel.findOne({ _id: userId });
        if (user && user.id) {
          const notification = {
            read_status: false,
            type: "schedule",
            content: `${posterId}:${name}:${patient}:${details}:${end}`,
          };
          const a = await UserModel.findByIdAndUpdate(
            { _id: user.id },
            {
              $push: {
                notifications: notification
              }
            },
            { new: true, runValidators: true }
          )
        }
      }
    }
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
    return response.status(400).json({ error: "all fields must be provided" });
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
  createProcedure,
  getProcedures,
  getProceduresById,
  updateProcedure,
  deleteProcedure,
};
