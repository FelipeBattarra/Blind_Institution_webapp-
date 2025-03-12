"use client";
import Header from "@/components/common/header";
import { Route } from "@/components/compras-e-orcamentos/navigation";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';

  const basePath = path ? `/${path}` : '';

  const routes: Route[] = [
    {
      href: `${basePath}`,
      label: "Controle",
    },
    {
      href: `${basePath}/marcas`,
      label: "Marcas",
    },
    {
      href: `${basePath}/montadores`,
      label: "Montadores",
    },
    {
      href: `${basePath}/cartonagens`,
      label: "Cartonagens",
    },
    
  ];

  return (
    <>
      <Header nav={routes} message={"Controle de Produção de Caixas"} />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
