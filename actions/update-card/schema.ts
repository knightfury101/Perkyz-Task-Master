import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description Is Required",
        invalid_type_error: "Description Is Required",
      })
      .min(3, {
        message: "Description Is Too Short",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title Is Required",
        invalid_type_error: "Title Is Required",
      })
      .min(3, {
        message: "Title Is Too Short",
      })
  ),
  id: z.string(),
});
