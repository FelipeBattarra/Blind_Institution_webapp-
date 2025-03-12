"use client"
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
      label: "Doadores",
    },
    {
      href: `${basePath}/donations`,
      label: "Doações",
    },
    {
      href: `${basePath}/family`,
      label: "Famílias",
    },
    {
      href: `${basePath}/reports`,
      label: "Gerar Relatórios",
    },
  ];

  return (
    <>
      <Header nav={routes} message={"Centralize as compras e orçamentos em um só lugar!"} />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
