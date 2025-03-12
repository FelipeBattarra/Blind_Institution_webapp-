"use client"
import Header from "@/components/common/header";
import { Route } from "@/components/compras-e-orcamentos/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
      label: "Dashboard",
    },
    {
      href: `/prestacao-de-servicos/cadastros`,
      label: "Fornecedores",
    },
  ];

  return (
    <>
      <Header nav={routes} message={"Verifique todos os registros de contas pendentes"} />
      <main className="px-3 lg:px-14">{children}</main>
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
};

export default DashboardLayout;
