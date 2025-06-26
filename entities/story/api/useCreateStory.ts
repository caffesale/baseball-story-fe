import { StoryImage } from "@/shared/model/imageType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStory } from "../model";
import { postStory } from "./postStory";

function useCreateStory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            storyData,
            images,
        }: {
            storyData: TStory;
            images?: StoryImage[];
        }) => postStory(storyData, images),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
        onError: (err: Error) => {
            console.error("story creation failed: " + err?.message);
        },
    });
}

export { useCreateStory };
