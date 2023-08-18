export const TAB_BOTTOM_HEIGHT = "90";

// KEY
export const GOOGLE_API_KEY = "API_GOOGLE_KEY";

export enum SocialProvider {
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    LINE = "LINE",
    APPLE = "APPLE",
}

const ESIM_GO_API_URL = "https://api.esim-go.com/v2.2";

export const ESIM_GO_GET_ESIM_QR_CODE_IMG = (code: string) =>
    `${ESIM_GO_API_URL}/esims/${code}/qr`;

export const IDS_OPEN_SELECT_COUNTRY = [
    "logo-click-mask",
    "select-country__input",
    "select-country__dropdown",
    "input-text__clear-icon",
];

export const POPULAR_COUNTRIES = [
    "US",
    "EG",
    "TN",
    "MA",
    "TR",
    "AE",
    "IT",
    "FR",
    "US",
    "ES",
    "GB",
    "BE",
];
