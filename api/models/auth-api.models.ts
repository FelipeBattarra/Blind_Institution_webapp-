interface UserState {
    name: string;
    email: string;
    role: string[];
}

export interface AuthState {
    token: string;
    user: UserState;
};