"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            window.location.href = '/sign-in'; // Redirect to home page
        } else {
            alert('Erro ao criar usuário.');
        }
    };

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Crie sua conta no ERP</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Preencha os campos abaixo para se cadastrar
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Nome completo
                        </label>
                        <Input type="text" id="name" placeholder="João Silva" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Endereço de email
                        </label>
                        <Input type="email" id="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Senha
                        </label>
                        <Input type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 mt-4" type="submit">
                        Criar conta
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
                    Já tem uma conta?{" "}
                    <Link href="/sign-in" className="font-medium text-primary underline underline-offset-4">
                        Fazer login
                    </Link>
                </div>
                <div className="text-xs text-muted-foreground">
                    Desenvolvido por Uni-FACEF
                </div>
            </CardFooter>
        </Card>
    )
}