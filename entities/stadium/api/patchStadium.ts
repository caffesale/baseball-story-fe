import { apiUrl } from "@/shared/utils/constants";

async function patchStadium({
    stadiumId,
    name,
}: {
    stadiumId: string;
    name: string;
}) {
    const response = await fetch(
        `${apiUrl}/api/v1/stadiums/${stadiumId}?name=${name}`
    );
    if (!response.ok) throw new Error("failed to fetch: patchStadium");
    return response.json();
}

export { patchStadium };
