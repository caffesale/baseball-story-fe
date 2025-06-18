import { z } from "zod";
import { teamSchema } from "./team-type";

const stadiumSchema = z.object({
    stadiumId: z.string(),
    name: z.string(),
    team: teamSchema,
    ownerId: z.number(),
});

type TStadium = z.infer<typeof stadiumSchema>;

export { stadiumSchema, teamSchema, TStadium };
