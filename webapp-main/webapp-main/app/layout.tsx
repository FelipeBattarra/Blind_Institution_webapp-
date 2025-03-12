"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

import "./globals.css";
import SheetProvider from "@/providers/sheet-provider";

import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const modulesName = [
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

function getHeaderNameByHref(href: string): string | undefined {
  const foundModule = modulesName.find((mod) => mod.href === href);
  return foundModule ? foundModule.name : undefined;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const path = pathname ? `/${pathname.split("/")[1]}` : "/";

  useEffect(() => {
    const headerName = getHeaderNameByHref(path);
    document.title = `ERP - ${headerName || "Módulos"}`;
  }, [path]);

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SheetProvider />
        {children}
      </body>
    </html>
  );
}
