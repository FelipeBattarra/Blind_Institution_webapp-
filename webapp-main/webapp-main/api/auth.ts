import api from "./api"
import { AppError } from "./errors/app.error";
import { HttpResult } from "./models/api.models";
import { AuthState } from "./models/auth-api.models";

// Can use as example function integration
export const authenticate = async function (account: string, password: string): Promise<AuthState> {
    try {
        const response = (await api.post("/auth/login", { account, password })).data as HttpResult<AuthState>;
        if (response.success) {
            return response.data!;
        }

        throw new AppError(response.error);
    } catch (error) {
        const result = error as HttpResult<any>;
        throw new AppError(result.error);
    }
} 