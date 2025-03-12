"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { getAgendamentosByFilters } from '@/pages/api/prestacao-de-servicos/api';
import GenericTable from '@/components/prestacao-de-servicos/TabelaRelatorio'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";

interface Agendamento {
  id: string;
  titulo: string;
  prestador: string;
  cliente: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';
  const [cadastros, setCadastros] = useState<Agendamento[]>([]);

  const searchParams = useSearchParams();

  // Extrai os parâmetros da URL
  const nome = searchParams.get("nome");
  const cliente = searchParams.get("cliente");
  let prestador = searchParams.get("prestador");
  const data = searchParams.get("data");
  const hora = searchParams.get("hora");

  // Função de busca
  const buscaResult = async () => {
    try {
      const resultado = await getAgendamentosByFilters(nome, cliente, prestador, data, hora);
      setCadastros(resultado);
    } catch (error) {
      console.error("Erro ao buscar cadastros:", error);
    }
  };

  // Usa useEffect para chamar buscaResult ao carregar o componente ou quando os parâmetros mudarem
  useEffect(() => {
    buscaResult();
  }, [nome, cliente, prestador, data, hora]);

  // Renomeia os campos antes de passar para a tabela
  const agendamentosRenomeados = cadastros.map((cadastro) => ({
    Título: cadastro.titulo,
    Prestador: cadastro.prestador,
    Cliente: cadastro.cliente,
    Inicio: cadastro.inicio,
    Fim: cadastro.fim,
    Descricao: cadastro.descricao
  }));

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleBack = () => {
    retornaPagina(`${basePath}/relatorios/agendamentos`)
  };

  const handleButtonClick = (item: string) => {
    const queryParams = new URLSearchParams({ id: item }).toString();
    retornaPagina(`${basePath}/cadastros/edita-prestador?${queryParams}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className='relative w-full flex justify-center mb-10'>
          <h2 className='text-2xl font-bold'>Consultar Cadastros</h2>          
          <Button className='absolute top-0 left-0 ml-10' variant="secondary" onClick={handleBack}>Voltar</Button>
        </div>
        <GenericTable 
          items={agendamentosRenomeados} 
        />
      </div>
    </div>
  );
}
