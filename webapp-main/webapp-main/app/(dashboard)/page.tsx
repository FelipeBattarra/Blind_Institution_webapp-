"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import HeaderModules from "@/components/compras-e-orcamentos/headerModules";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const modules = [
  {
    name: "Compras e Orçamentos",
    href: "/compras-e-orcamentos",
  },
  {
    name: "Eventos",
    href: "/eventos",
  },
  {
    name: "Produção de Caixas",
    href: "/producao-de-caixas",
  },
  {
    name: "Controle de Doadores",
    href: "/controle-de-doadores",
  },
  {
    name: "Patrimônio",
    href: "/patrimonio",
  },
  {
    name: "Estoque",
    href: "/estoque",
  },
  {
    name: "Prestação de Serviços",
    href: "/prestacao-de-servicos",
  },
  {
    name: "Agenda de Pagamentos",
    href: "/agenda-de-pagamentos",
  },
];

export default function ModulesPage() {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <HeaderModules />
      <main className="px-3 lg:px-14">
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-x-4">
              <h1 className="text-2xl font-bold">{`Módulos (${modules.length})`}</h1>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                {modules.map((module, index) => (
                  <Card key={index} className="border-none drop-shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between gap-x-4">
                      <h1 className="text-2xl font-bold">{module.name}</h1>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter>
                      <Button
                        className="w-30 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleClick(module.href)}
                      >
                        Acessar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
