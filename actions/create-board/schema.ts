import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title Is Required",
      invalid_type_error: "Title Is Required",
    })
    .min(3, {
      message: "Title Is Too Short.",
    }),
  image: z.string({
    required_error: "Image Is Required",
    invalid_type_error: "Image Is Required",
  }),
});
