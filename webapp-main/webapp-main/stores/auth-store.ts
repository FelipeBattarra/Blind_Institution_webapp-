import { AuthState } from "@/api/models/auth-api.models";
import { AuthStorageKeys } from "@/enums/local-storage-keys";
import { create } from "zustand";
import { parseCookies, destroyCookie, setCookie } from 'nookies';

interface AuthStore extends AuthState {
    setAuth: (credential: AuthState) => void;
    clearAuth: () => void;
}

const cookies = parseCookies();

export const useAuthStore = create<AuthStore>((set) => ({
    token: cookies.token || "",
    user: cookies.user ? JSON.parse(cookies.user) : { email: "", name: "", role: [] },
    setAuth: (credential: AuthState) => {
        set({ user: credential.user, token: credential.token });
        // Salvar nos cookies
        setCookie(null, 'token', credential.token, {
            maxAge: 30 * 24 * 60 * 60, // 30 dias
            path: '/',
        });
        setCookie(null, 'user', JSON.stringify(credential.user), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    },
    clearAuth: () => {
        set({ token: "", user: { email: "", name: "", role: [] } });
        // Remover dos cookies
        destroyCookie(null, 'token');
        destroyCookie(null, 'user');
    }
}));