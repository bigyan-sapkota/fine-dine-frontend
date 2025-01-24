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
