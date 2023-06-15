let ACCESS_TOKEN = "";

export const setAccesstoken = (token: string) => {
  ACCESS_TOKEN = token;
};
export const getAccessToken = () => ACCESS_TOKEN;
