import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title Is Required",
      invalid_type_error: "Title Is Required",
    })
    .min(3, {
      message: "Title Is Too Short",
    }),
  boardId: z.string(),
  listId: z.string(),
});
