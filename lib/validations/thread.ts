import * as z from "zod";

export const ThreadValidation = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  thread: z
    .string()
    .min(1, { message: "Content is required." })
    .max(1000, { message: "Content must not exceed 1000 characters." }),
  accountId: z.string().optional(),
  image: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.startsWith("data:image/"),
      "Image must be a valid base64-encoded string."
    ),
});


export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
