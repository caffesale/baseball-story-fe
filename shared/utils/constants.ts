const TEAM_INFO = {
    LG: {
        name: "LG 트윈스",
        city: "서울",
        image: require("@/assets/images/lg_twins.gif"),
    },
    HANWHA: {
        name: "한화 이글스",
        city: "대전",
        image: require("@/assets/images/lg_twins.gif"),
    },
    SAMSUNG: {
        name: "삼성 라이온즈",
        city: "대구",
        image: require("@/assets/images/lg_twins.gif"),
    },
    LOTTE: {
        name: "롯데 자이언츠",
        city: "부산",
        image: require("@/assets/images/lg_twins.gif"),
    },
    KT: {
        name: "KT 위즈",
        city: "수원",
        image: require("@/assets/images/lg_twins.gif"),
    },
    KIA: {
        name: "KIA 타이거즈",
        city: "광주",
        image: require("@/assets/images/lg_twins.gif"),
    },
    NC: {
        name: "NC 다이노스",
        city: "창원",
        image: require("@/assets/images/lg_twins.gif"),
    },
    KIWOOM: {
        name: "키움 히어로즈",
        city: "서울",
        image: require("@/assets/images/lg_twins.gif"),
    },
    DOOSAN: {
        name: "두산 베어스",
        city: "서울",
        image: require("@/assets/images/lg_twins.gif"),
    },
    SSG: {
        name: "SSG 랜더스",
        city: "인천",
        image: require("@/assets/images/lg_twins.gif"),
    },
} as const;

type TEAM_CODE = keyof typeof TEAM_INFO;

export { TEAM_CODE, TEAM_INFO };

const keys = Object.keys(TEAM_INFO);
