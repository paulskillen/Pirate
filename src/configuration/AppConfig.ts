import DevConfig from "./DevConfig";
import ProConfig from "./ProConfig";

const ENV = {
    DEV: "dev",
    PRO: "production",
};

const getConfig = () => {
    switch (process.env.REACT_APP_ENV) {
        case ENV.DEV:
            return DevConfig;
        default:
            return ProConfig;
    }
};

export const CONFIG: { [key in keyof typeof DevConfig]: any } =
    getConfig() as any;
