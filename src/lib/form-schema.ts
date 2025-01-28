import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(4, "Too short name").max(40, "Too long name").optional(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const addTableSchema = z.object({
  tag: z.string(),
  attribute: z.string(),
  capacity: z.preprocess(
    (val) => Number(val) || undefined,
    z
      .number({ required_error: "Capacity is required" })
      .min(1, "Table can't have capacity less than 1")
      .max(12, "Table can't have capacity more than 12"),
  ),
  hourRate: z.preprocess(
    (val) => Number(val) || undefined,
    z
      .number({ message: "Hourly Rate is required" })
      .min(100, "Hourly rate must be minimum Rs. 100")
      .max(1000, "Hourly rate for a table can't exceed Rs. 1,000"),
  ),
});

export type AddTableSchema = z.infer<typeof addTableSchema>;
export type UpdateTableSchema = Partial<AddTableSchema>;

export const bookingSchema = z.object({
  date: z
    .date({ required_error: "Date is required" })
    .min(new Date(), "Cannot book for a past date"),
  time: z
    .string()
    .refine(
      (val) => /^(\d{1,2}):(00|15|30|45)$/.test(val),
      "Time must be in x:00, x:15, x:30, or x:45 format",
    ),
  hours: z.number().min(1, "Minimum booking time is 1 hour"),
  people: z
    .number()
    .min(1, "At least 1 person is required")
    .max(20, "Maximum 20 people allowed"),
});

export type BookingForm = z.infer<typeof bookingSchema>;

export const registrationSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must not exceed 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(60, "Name must not exceed 60 characters"),
    phone: z.preprocess(
      (val) => Number(val) || undefined,
      z
        .number()
        .refine((val) => String(val).length === 10, "Invalid phone number")
        .optional(),
    ),
    address: z
      .string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
