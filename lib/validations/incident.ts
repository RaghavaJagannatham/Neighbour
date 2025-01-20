import * as z from "zod";

export const IncidentValidation = z.object({
  incident: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  incident: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

