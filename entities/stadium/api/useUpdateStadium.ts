import { useMutation } from "@tanstack/react-query";
import { patchStadium } from "./patchStadium";

function useUpdateStadium() {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (query: { stadiumId: string; name: string }) =>
            patchStadium(query),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["stadium"] });
        },
        onError: (err: Error) => {
            console.error("stadium creation failed" + err?.message);
        },
    });
}

export { useUpdateStadium };
