"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as customValidators from "@/lib/custom-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticate } from "@/api/auth";
import { useAuthStore } from "@/stores/auth-store";
import { setCookie } from "nookies";

const loginSchema = z.object({
  cpf: z.string().refine(customValidators.validateCPF, {
    message: "CPF inválido",
  }),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(100, "A senha deve ter no máximo 100 caracteres."),
});

export default function LoginForm() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: z.infer<typeof loginSchema>) => {
    try {
      const loginPromise = authenticate(data.cpf, data.password);
      toast.promise(loginPromise, {
        success: "Login efetuado com sucesso!, redirecionando para dashboard...",
        error: "Erro ao efetuar login",
        pending: "Efetuando login...",
      });

      const result = await loginPromise;
      setAuth({ token: result.token, user: result.user });

      setCookie(null, 'token', result.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      setCookie(null, 'user', JSON.stringify(result.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Entre no ERP</CardTitle>
          <p className="text-sm text-muted-foreground">
            Bem-vindo de volta! Por favor, faça login para continuar
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(login)}>
            <div className="space-y-2">
              <label
                htmlFor="cpf"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                CPF
              </label>
              <Input id="cpf" {...register("cpf")} />
              {errors.cpf && (
                <span className="text-red-600">{errors.cpf.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Senha
              </label>
              <Input
                type="password"
                id="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-700 mt-4"
              type="submit"
            >
              Entrar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <div className="text-sm text-center">
            Não tem uma conta?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary underline underline-offset-4"
            >
              Inscrever-se
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            Desenvolvido por Uni-FACEF
          </div>
        </CardFooter>
      </Card>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
