import { AuthState } from "@/api/models/auth-api.models";
import { setCookie } from 'nookies';

export const setAuth = (credential: AuthState): void => {
    setCookie(null, "token", credential.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
    });
    setCookie(null, "current-user", JSON.stringify(credential.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}