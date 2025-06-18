import { z } from "zod";

const teamSchema = z.enum([
    "LG",
    "HANWHA",
    "SAMSUNG",
    "LOTTE",
    "KT",
    "KIA",
    "NC",
    "KIWOOM",
    "DOOSAN",
    "SSG",
]);

type TTeam = z.infer<typeof teamSchema>;

export { teamSchema, TTeam };
