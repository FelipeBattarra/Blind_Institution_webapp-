'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Loader2 } from "lucide-react";

import HeaderLogo from "@/components/common/header-logo";
import Navigation, { Route } from "@/components/compras-e-orcamentos/navigation";
import WelcomeMsg from "@/components/compras-e-orcamentos/welcome-msg";
import { Button } from "../ui/button";

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
    href: "/controle-de-doadores"
  },
  {
    name: "Patrimônio",
    href: "/patrimonio"
  },
  {
    name: "Estoque",
    href: "/estoque"
  },
  {
    name: "Prestação de Serviços",
    href: "/prestacao-de-servicos"
  },
  {
    name: "Agenda de Pagamentos",
    href: "/agenda-de-pagamentos"
  },
];

function getHeaderNameByHref(href: string): string | undefined {
  const hrefModule = href.split('/')[1];
  const foundModule = modulesName.find(module => module.href === `/${hrefModule}`);
  return foundModule ? foundModule.name : undefined;
}

const Header = ({ nav, message }: { nav: Route[], message: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const headerName = pathname ? getHeaderNameByHref(pathname) : undefined;

  const handleExitModule = () => {
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo title={headerName} />
            <Navigation nav={nav} />
          </div>
          <div className="flex items-center gap-x-4">
            <Button onClick={handleExitModule} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Sair do Módulo
            </Button>
          </div>
        </div>
        <WelcomeMsg message={message} />
      </div>
    </header>
  );
};

export default Header;