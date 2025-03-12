import { AppError } from "./app.error";

export class AuthenticationError extends AppError {
    public constructor() {
        super("Falha no login do usuário. Verifique as suas credenciais e tente novamente.");
    }
}