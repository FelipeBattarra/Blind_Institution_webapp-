"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosAdd } from 'react-icons/io';
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAgendamentos, getCadastroByType } from "@/pages/api/prestacao-de-servicos/api"

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

interface Agendamento {
    id: string;
    titulo: string;
    prestador: string;
    cliente: string;
    inicio: string;
    fim: string;
    descricao: string;
}

const Agendamentos = () => {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';
  const [formData, setFormData] = useState({
    nome: '',
    cliente: '',
    prestador: '',
    tipo: 'all',
    data: '',
    hora: ''
  });
  const [cadastros, setCadastros] = useState<Agendamento[]>([]);
  const [providers, setProviders] = useState<Cadastro[]>([]);
  const [clients, setClients] = useState<Cadastro[]>([]);

  const fetchCad = async () => {
    try {
      const response = await getAgendamentos();
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
    router.push(`${basePath}/relatorios/agendamentos/agendamentos-resultado?${queryParams}`);
  };

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleBack = () => {
    retornaPagina(`${basePath}/relatorios`)
  };
  
  const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((dataForm) => ({
      ...dataForm,
      [name]: value
    }));
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg'>
      <div className='relative w-full flex justify-center mb-8'>
        <h2 className='text-2xl font-bold'>Relatório de Agendamentos</h2>
        <Button className='absolute top-0 left-0' variant="secondary" onClick={handleBack}>Voltar</Button>
      </div>        

        <div className='grid grid-cols-4 gap-10 mb-16'>
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Título</Label>
                <Select
                value={formData.nome}
                onValueChange={(value) => setFormData({ ...formData, nome: value })}
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o Título" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {cadastros.map((client) => (
                    <SelectItem value={client.id} key={client.id}>
                        {client.titulo}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Prestador</Label>
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
            <div className='w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor="cliente">Cliente</Label>
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
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="data">Data:</Label>
              <div className='flex gap-4'>
                <Input 
                  className="w-full"
                  type="date" 
                  id="data" 
                  name="data" 
                  value={formData.data} 
                  onChange={handleInputChangeEdit}
                />

                <Input 
                  className="w-1/3"
                  type="time" 
                  id="hora" 
                  name="hora" 
                  value={formData.hora} 
                  onChange={handleInputChangeEdit}
                />
              </div>
            </div>           
        </div>

      <div className='relative w-full flex justify-end'>
        <Button className='bg-blue-500 text-white hover:bg-blue-600 mt-8' variant="secondary" onClick={handleSubmit}>Consultar</Button>
      </div>
    </div>
  );
};

export default Agendamentos;
