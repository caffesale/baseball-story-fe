import { apiUrl } from "@/shared/utils/constants";
import { IPostStadium } from "../model";

async function postStadium(body: IPostStadium) {
    const response = await fetch(`${apiUrl}/api/v1/stadiums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch: postStadium");
    }
    return response.json();
}

export { postStadium };
