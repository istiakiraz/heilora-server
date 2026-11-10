import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),

  doctor: z.object({
    name: z
      .string("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must be at most 30 characters"),

    email: z.email("Invalid email address"),

    profilePhoto: z.url("Invalid profile photo URL").optional(),

    contactNumber: z
      .string()
      .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional(),

    address: z
      .string()
      .max(255, "Address must be at most 255 characters")
      .optional(),

    registrationNumber: z
      .string("Registration number is required")
      .min(1, "Registration number is required"),

    experience: z
      .number("Experience must be a number")
      .int("Experience must be an integer")
      .min(0, "Experience cannot be negative")
      .default(0),

    gender: z.enum(
      [Gender.MALE, Gender.FEMALE, Gender.OTHER],
      "Gender is required",
    ),

    appointmentFee: z
      .number("Appointment fee must be a number")
      .nonnegative("Appointment fee cannot be negative"),

    qualification: z
      .string("Qualification is required")
      .min(2, "Qualification must be at least 2 characters"),

    currentWorkingPlace: z
      .string("Current working place is required")
      .min(2, "Current working place must be at least 2 characters"),

    designation: z
      .string("Designation is required")
      .min(2, "Designation must be at least 2 characters"),
  }),
  specialties: z
    .array(z.uuid(), "Specialties must be an array of strings")
    .min(1, "At least one specialty is required"),
});