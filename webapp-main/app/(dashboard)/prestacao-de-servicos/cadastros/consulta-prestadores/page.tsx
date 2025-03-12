"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { searchCadastros } from '@/pages/api/prestacao-de-servicos/api';
import GenericTable from '@/components/prestacao-de-servicos/TabelaRelatorio'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";

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
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);

  const searchParams = useSearchParams();

  // Extrai os parâmetros da URL
  const id = searchParams.get("id");
  const cpf = searchParams.get("cpfCnpj");
  let tipoCad = searchParams.get("tipoCadastro");
  const email = searchParams.get("email");

  // Verifica e ajusta o valor de tipoCadastro
  const tipo = tipoCad && tipoCad !== 'all' ? tipoCad : '';

  // Função de busca
  const buscaResult = async () => {
    try {
      const resultado = await searchCadastros(id, cpf, tipo, email);
      setCadastros(resultado);
    } catch (error) {
      console.error("Erro ao buscar cadastros:", error);
    }
  };

  // Usa useEffect para chamar buscaResult ao carregar o componente ou quando os parâmetros mudarem
  useEffect(() => {
    buscaResult();
  }, [id, cpf, tipoCad, email]);

  // Renomeia os campos antes de passar para a tabela
  const cadastrosRenomeados = cadastros.map((cadastro) => ({
    Nome: cadastro.nome,
    'CPF/CNPJ': cadastro['cpf-cnpj'],
    RG: cadastro.rg,
    Celular: cadastro.celular,
    Email: cadastro.email,
    Endereço: cadastro.endereco,
    'Tipo de Cadastro': cadastro['tipo-cadastro'] === '0' ? 'Prestador' : 'Cliente',
    Observações: cadastro.observacoes,
    Ação: cadastro.id
  }));

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleBack = () => {
    retornaPagina(`${basePath}/cadastros`)
  };

  const handleButtonClick = (item: string) => {
    const queryParams = new URLSearchParams({ id: item }).toString();
    retornaPagina(`${basePath}/cadastros/edita-prestador?${queryParams}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className='relative w-full flex justify-center mb-10'>
          <h2 className='text-2xl font-bold'>Consultar Prestadores e Clientes</h2>          
          <Button className='absolute top-0 left-0 ml-10' variant="secondary" onClick={handleBack}>Voltar</Button>
        </div>
        <GenericTable 
          items={cadastrosRenomeados} 
          renderers={{
            Ação: (IdSelected) => (
              <button 
                onClick={() => handleButtonClick(IdSelected)}
                className="px-4 py-2 bg-blue-500 text-white rounded">
                Detalhes
              </button>
            ),
          }}
        />
      </div>
    </div>
  );
}
