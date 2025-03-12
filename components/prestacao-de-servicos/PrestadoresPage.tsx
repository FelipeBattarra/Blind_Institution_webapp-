"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosAdd } from 'react-icons/io';
import { usePathname, useRouter } from "next/navigation";
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCadastros } from "@/pages/api/prestacao-de-servicos/api"

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

const Signup = () => {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';
  const [formData, setFormData] = useState({
    email: '',
    cpfCnpj: '',
    tipoCadastro: '',
    id: ''
  });
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);

  const fetchCad = async () => {
    try {
      const response = await getCadastros();
      setCadastros(response);
    } catch (error) {
      console.error('Erro ao buscar cadastros:', error);
    }
  };

  useEffect(() => {
    fetchCad();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`${basePath}/cadastros/consulta-prestadores?${queryParams}`);
  };
  
  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg'>
      <div className='relative w-full flex justify-center mb-8'>
        <h2 className='text-2xl font-bold'>Consultar Prestadores e Clientes</h2>
        <Button onClick={() => onClick(`${basePath}/cadastros/cadastro-prestadores`)} className='absolute top-0 right-0' variant="secondary">
          <IoIosAdd /> Adicionar novo
        </Button>
      </div>        

      <div className='grid grid-cols-4 grid-flow-col gap-10'>
      <div className='w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor="cliente">Cadastro</Label>
        <Select
          value={formData.id}
          onValueChange={(value) => setFormData({ ...formData, id: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o Cadastro" />
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
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email"  // Atualize o nome
            placeholder="Email"
            value={formData.email} 
            onChange={handleChange}
          />
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cpf-cnpj">CPF/CNPJ</Label>
          <Input 
            type="text" 
            id="cpf-cnpj" 
            name="cpfCnpj"  // Atualize o nome
            placeholder="CPF/CNPJ" 
            value={formData.cpfCnpj} 
            onChange={handleChange}
          />
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="tipo-cadastro">Tipo de Cadastro</Label>
          <Select
          value={formData.tipoCadastro}
          onValueChange={(value) => setFormData({ ...formData, tipoCadastro: value })}
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
      </div>

      <div className='relative w-full flex justify-end'>
        <Button className='bg-blue-500 text-white hover:bg-blue-600 mt-8' variant="secondary" onClick={handleSubmit}>Consultar</Button>
      </div>
    </div>
  );
};

export default Signup;
