import { useSuspenseQuery } from "@tanstack/react-query";
import { getStoryById } from "./getStoryById";

// 사실 T를 Story 타입으로 정의해야할 것.
function useStory<T>(id: string) {
    const { data } = useSuspenseQuery<T>({
        queryKey: ["stories", id],
        queryFn: () => getStoryById(id),
    });
    return data;
}

export { useStory };
