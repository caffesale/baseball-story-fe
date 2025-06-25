import { apiUrl } from "@/shared/utils/constants";

async function getStoryById(storyId: string) {
    const response = await fetch(`${apiUrl}/api/v1/stories/${storyId}`);
    if (!response.ok) throw new Error("fetch failed: getStoryById");
    return response.json();
}

export { getStoryById };
