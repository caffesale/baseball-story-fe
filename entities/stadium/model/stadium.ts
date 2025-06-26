import { TEAM_CODE } from "@/shared/utils/constants";

interface IPostStadium {
    name: string;
    selectedTeam: TEAM_CODE;
    ownerId: number;
}

export { IPostStadium };
