import { createContext } from "react";
export default createContext({
    token: null,
    userId: null,
    isEmployer: false,
    login: (token, userId, tokenExpiration, isEmployer) => {},
    logout: () => {},
});
