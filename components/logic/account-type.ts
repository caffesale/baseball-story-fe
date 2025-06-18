import { z } from "zod";

const accountSchema = z.object({
    name: z.string(),
    phone: z.number(),
    profileImageId: z.string(),
});

type TAccount = z.infer<typeof accountSchema>;

export { accountSchema, TAccount };
