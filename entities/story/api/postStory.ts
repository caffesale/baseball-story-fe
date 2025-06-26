import { StoryImage } from "@/shared/model/imageType";
import { apiUrl } from "@/shared/utils/constants";
import { TStory } from "../model";

async function postStory<T>(
    storyData: TStory,
    images?: StoryImage[]
): Promise<T> {
    try {
        const formData = new FormData();

        // 기본 필드들 추가
        formData.append("category", storyData.type);
        formData.append("content", storyData.content);
        formData.append("writerId", storyData.writerId.toString());

        // 이미지 파일들 추가
        if (images && images.length > 0) {
            images.forEach((image, index) => {
                if ("uri" in image) {
                    // React Native 환경
                    formData.append("storyImgs", {
                        uri: image.uri,
                        name: image.name,
                        type: image.type,
                    } as any);
                } else {
                    // 웹 환경
                    formData.append("storyImgs", image);
                }
            });
        }

        const response = await fetch(`${apiUrl}/api/v1/stories`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                    `HTTP ${response.status}: ${response.statusText}`
            );
        }

        return response.json() as T;
    } catch (error) {
        console.error("스토리 생성 실패:", error);
        throw error;
    }
}

export { postStory };
