"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { searchCadastros } from '@/pages/api/prestacao-de-servicos/api';
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import EditarCadastro from "@/components/prestacao-de-servicos/edita-prestadores"

interface Cadastro {
  id: string;
  nome: string;
  'cpf-cnpj': string;
  rg: string;
  celular: string;
  email: string;
  endereco: string;
  'tipo-cadastro': string;
  observacoes: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';

  const searchParams = useSearchParams();

  // Extrai os parâmetros da URL
  const id = searchParams.get("id");

  const idSelected = String(id)

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleBack = () => {
    retornaPagina(`${basePath}/cadastros`)
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className='relative w-full flex justify-center mb-10'>
          <h2 className='text-2xl font-bold'>Editar Cadastro</h2>          
          <Button className='absolute top-0 left-0' variant="secondary" onClick={handleBack}>Voltar</Button>
        </div>
        <EditarCadastro id={idSelected}/>
      </div>
    </div>
  );
}
