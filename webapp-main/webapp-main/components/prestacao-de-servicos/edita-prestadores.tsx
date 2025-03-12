"use client"; // Adicione esta linha

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosAdd } from 'react-icons/io'
import { updateCadastro, getCadastroById, deleteCadastro } from '@/pages/api/prestacao-de-servicos/api'
import { usePathname, useRouter } from "next/navigation";
import ConfirmationPopup from '@/components/prestacao-de-servicos/ConfirmaModal';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

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


const EditarCadastro = ({ id }: { id: string }) => {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    rg: '',
    celular: '',
    email: '',
    endereco: '',
    tipoCadastro: '0',
    observacoes: ''
  });
  const popupRef = useRef<any>(null);

  const handleTimeout = () => {
    // retornaPagina(`${basePath}/cadastros`)
  };

  const handleShowPopup = () => {
    if (popupRef.current) {
      popupRef.current.handleOpen();
    }
  };

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    const novoCadastro: Cadastro = {
      id: id,
      nome: formData.nome,
      'cpf-cnpj': formData.cpfCnpj,
      rg: formData.rg,
      celular: formData.celular,
      email: formData.email,
      endereco: formData.endereco,
      'tipo-cadastro': formData.tipoCadastro,
      observacoes: formData.observacoes
    };
  
    // Função assíncrona para adicionar o agendamento
    try {
      const createdAgendamento = await updateCadastro(id, novoCadastro);
      handleShowPopup()
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
    }
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const cadastro = await getCadastroById(id);
        setFormData({
            nome: cadastro.nome || '',
            cpfCnpj: cadastro['cpf-cnpj'] || '',
            rg: cadastro.rg || '',
            celular: cadastro.celular || '',
            email: cadastro.email || '',
            endereco: cadastro.endereco || '',
            tipoCadastro: cadastro['tipo-cadastro'] || '0',
            observacoes: cadastro.observacoes || ''
          });
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
      }
    };

    fetchDados();
  }, []);

  const handleDeleteCad = async () => {
    try {
        const editedAgendamento = await deleteCadastro(id);
        retornaPagina(`${basePath}/cadastros`)
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
    }    
  };

  return (
    <div>     
        <div className='grid grid-cols-4 gap-10'>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input 
            type="text" 
            id="nome" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            placeholder="Nome" 
            required 
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cpf-cnpj">CPF/CNPJ</Label>
            <Input 
            type="text" 
            id="cpf-cnpj" 
            name="cpfCnpj" 
            value={formData.cpfCnpj} 
            onChange={handleChange} 
            placeholder="CPF/CNPJ" 
            required 
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="rg">RG</Label>
            <Input 
            type="text" 
            id="rg" 
            name="rg" 
            value={formData.rg} 
            onChange={handleChange} 
            placeholder="RG"                
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cel">Celular</Label>
            <Input 
            type="text" 
            id="cel" 
            name="celular" 
            value={formData.celular} 
            onChange={handleChange} 
            placeholder="Celular"                
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="E-mail" 
            required 
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="endereco">Endereço</Label>
            <Input 
            type="text" 
            id="endereco" 
            name="endereco" 
            value={formData.endereco} 
            onChange={handleChange} 
            placeholder="Endereço"                
            />
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="tipo-cadastro">Tipo de Cadastro</Label>
            <select 
            id="tipo-cadastro" 
            name="tipoCadastro" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.tipoCadastro}
            onChange={handleChange}
            required
            >
            <option value="0">Prestador</option>
            <option value="1">Cliente</option>
            </select>
        </div>
        <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="observacoes">Observações</Label>
            <Input 
            type="text" 
            id="observacoes" 
            name="observacoes" 
            value={formData.observacoes} 
            onChange={handleChange} 
            placeholder="Observações" 
            />
        </div>
        </div>     
        <div className="flex justify-between my-8">            
            <Button variant="destructive" onClick={() => setOpen(true)}>Excluir Cadastro</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                <Button className="hidden">Abrir popup</Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmação de Exclusão</DialogTitle>
                    <DialogDescription>
                    Tem certeza de que deseja excluir este cadastro? Essa ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                    Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteCad}>
                    Confirmar Exclusão
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button variant="secondary" className='bg-blue-500 text-white hover:bg-blue-600' onClick={handleSubmit}>Editar</Button>
        </div>

        <ConfirmationPopup
            ref={popupRef}
            title="Edição Confirmada!"
            subtitle="Sua edição foi realizada com sucesso."
            onTimeout={handleTimeout}
        />
    </div>
  );
};

export default EditarCadastro;
