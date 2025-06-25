import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStadium } from "./postStadium";

function useCreateStadium() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postStadium,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stadium"] });
        },
        onError: (err: Error) => {
            console.error("stadium creation failed" + err?.message);
        },
    });
}

export { useCreateStadium };
