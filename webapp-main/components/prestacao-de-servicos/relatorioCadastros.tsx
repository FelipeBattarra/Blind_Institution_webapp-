"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosAdd } from 'react-icons/io';
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCadastros, getCadastroByType } from "@/pages/api/prestacao-de-servicos/api"

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

const Cadastros = () => {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';
  const [formData, setFormData] = useState({
    nome: '',
    cliente: '',
    prestador: '',
    tipo: 'all'
  });
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [providers, setProviders] = useState<Cadastro[]>([]);
  const [clients, setClients] = useState<Cadastro[]>([]);

  const fetchCad = async () => {
    try {
      const response = await getCadastros();
      setCadastros(response);
    } catch (error) {
      console.error('Erro ao buscar cadastros:', error);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await getCadastroByType('0');
      setProviders(response);
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error);
    }
  };
  
  const fetchClients = async () => {
    try {
      const response = await getCadastroByType('1');
      setClients(response);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchCad();
    fetchProviders();
    fetchClients();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`${basePath}/relatorios/cadastros/cadastros-resultado?${queryParams}`);
  };

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleBack = () => {
    retornaPagina(`${basePath}/relatorios`)
  };
  

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg'>
      <div className='relative w-full flex justify-center mb-8'>
        <h2 className='text-2xl font-bold'>Relatório de Cadastros</h2>
        <Button className='absolute top-0 left-0' variant="secondary" onClick={handleBack}>Voltar</Button>
      </div>        

        <div className='grid grid-cols-4 gap-10 mb-16'>
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Nome</Label>
                <Select
                value={formData.nome}
                onValueChange={(value) => setFormData({ ...formData, nome: value })}
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o Nome" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {cadastros.map((client) => (
                    <SelectItem value={client.id} key={client.id}>
                        {client.nome}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className="w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="tipo-cadastro">Tipo de Cadastro</Label>
                <Select
                value={formData.tipo}
                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione tipo de Cadastro" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value={"all"} key={"all"}> Todos </SelectItem>
                        <SelectItem value={"0"} key={"0"}> Prestador </SelectItem>
                        <SelectItem value={"1"} key={"1"}> Cliente </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Prestou Serviços Para:</Label>
                <Select
                    value={formData.cliente}
                    onValueChange={(value) => setFormData({ ...formData, cliente: value })}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o Cliente" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {clients.map((client) => (
                        <SelectItem value={client.id} key={client.id}>
                            {client.nome}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Foi Cliente De:</Label>
                <Select
                value={formData.prestador}
                onValueChange={(value) => setFormData({ ...formData, prestador: value })}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o Prestador" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {providers.map((client) => (
                        <SelectItem value={client.id} key={client.id}>
                            {client.nome}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>            
        </div>

      <div className='relative w-full flex justify-end'>
        <Button className='bg-blue-500 text-white hover:bg-blue-600 mt-8' variant="secondary" onClick={handleSubmit}>Consultar</Button>
      </div>
    </div>
  );
};

export default Cadastros;
