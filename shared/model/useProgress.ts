import React from "react";

function useProgress() {
    const [currentProgress, setCurrentProgress] = React.useState<number>(0);
    const handleProgress = React.useCallback((value: number) => {
        setCurrentProgress(value);
    }, []);
    return {
        currentProgress,
        handleProgress,
    };
}

export { useProgress };
