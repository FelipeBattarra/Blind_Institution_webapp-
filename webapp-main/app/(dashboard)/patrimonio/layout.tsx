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
      label: "Início",
    },
    {
      href: `${basePath}/cadastro`,
      label: "Cadastro",
    },
    {
      href: `${basePath}/retirada`,
      label: "Retirada",
    },
    {
      href: `${basePath}/descarte`,
      label: "Descarte",
    },
    {
      href: `${basePath}/manutencao`,
      label: "Manutenção",
    },
    {
      href: `${basePath}/relatorio`,
      label: "Relatório",
    },
  ];

  return (
    <>
      <Header nav={routes} message={"Centralize o patrimônio em um só lugar!"} />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
