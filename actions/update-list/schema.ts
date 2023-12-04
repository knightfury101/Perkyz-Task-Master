import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title Is Required",
      invalid_type_error: "Title Is Required",
    })
    .min(3, {
      message: "Title Is Too Short",
    }),
  id: z.string(),
  boardId: z.string(),
});
