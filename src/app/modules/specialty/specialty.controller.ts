/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const specialties = await SpecialtyService.getAllSpecialty();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty fetch successfully",
    data: specialties,
  });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SpecialtyService.deleteSpecialty(id as string);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty delete successfully",
    data: result,
  });
});

const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SpecialtyService.updateSpecialty(id as string, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty update successfully",
    data: result,
  });
});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
};
