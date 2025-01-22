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
      .max(12, "Table can't have capacity more than 12")
  ),
});

export type AddTableSchema = z.infer<typeof addTableSchema>;
export type UpdateTableSchema = Partial<AddTableSchema>;
