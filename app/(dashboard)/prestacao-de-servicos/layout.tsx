"use client"
import Header from "@/components/common/header";
import { Route } from "@/components/compras-e-orcamentos/navigation";
import { usePathname } from "next/navigation";

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
      label: "Agenda",
    },
    {
      href: `${basePath}/cadastros`,
      label: "Cadastros",
    },
    {
      href: `${basePath}/relatorios`,
      label: "Relatórios",
    },
  ];

  return (
    <>
      <Header nav={routes} message={"Centralize os prestadores de serviços em um só lugar!"} />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
