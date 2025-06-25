interface BasicStoryFields {
    content: string;
    writerId: number;
    createdAt: Date;
}

interface ReviewStory extends BasicStoryFields {
    type: "review";
}

interface AnalysisStory extends BasicStoryFields {
    type: "analysis";
    analysisTarget: string;
}

interface LiveStory extends BasicStoryFields {
    type: "live";
    viewPlace: string;
}

interface NewsStory extends BasicStoryFields {
    type: "news";
}

type TStory = ReviewStory | AnalysisStory | LiveStory | NewsStory;

export { TStory };
