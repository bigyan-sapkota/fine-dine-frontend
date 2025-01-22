import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(4, "Too short name").max(40, "Too long name").optional(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
