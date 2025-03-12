"use client"; // Essa diretiva garante que o componente seja renderizado no cliente

import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Event, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { IoIosAdd } from 'react-icons/io';
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAgendamentos, createAgendamento, getAgendamentoById, updateAgendamento, deleteAgendamento, getCadastroByType } from "@/pages/api/prestacao-de-servicos/api"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Configuração da localização (utilizando date-fns)
const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) => format(date, formatStr, { locale: ptBR }),
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // semana começa na segunda
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
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

const messages = {
  next: "Próximo",
  previous: "Anterior",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Nenhum evento neste intervalo.",
  showMore: (total: number) => `+ Ver mais (${total})`
};

const initialEventState = {
  id: '',
  title: '', 
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  provider: '',
  client: '',
  description: ''
};

const CalendarioAgendamento: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [eventos, setEventos] = useState<Event[]>();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenEdit, setModalOpenEdit] = useState(false);
  const [newEvent, setNewEvent] = useState(initialEventState);
  const [formData, setFormData] = useState({
    id: '',
    title: '', 
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    provider: '',
    client: '',
    description: ''
  });
  const [providers, setProviders] = useState<Cadastro[]>([]);
  const [clients, setClients] = useState<Cadastro[]>([]);


  const resetEvent = () => {
    setNewEvent(initialEventState);
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
    fetchProviders();
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const agendamentos = await getAgendamentos(); // Chama a função que busca os agendamentos

        // Mapeia os dados da API para o formato de Event
        const eventosDoServidor: Event[] = agendamentos.map((agendamento: any) => ({
          id: agendamento.id,
          title: agendamento.titulo,
          start: new Date(agendamento.inicio),
          end: new Date(agendamento.fim),
        }));

        // console.log(eventosDoServidor)

        // Atualiza o estado com os eventos recebidos
        setEventos(eventosDoServidor);
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
      }
    };

    fetchEventos(); // Chama a função
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };

  const handleSaveEvent = async () => {
    // Crie um novo evento que corresponda à interface Agendamento
    let inicio = `${newEvent.startDate}T${newEvent.startTime}:00`;  
    let newinicio = new Date(inicio)

    let fim = `${newEvent.endDate}T${newEvent.endTime}:00`;
    let newfim = new Date(fim)

    const novoAgendamento: Agendamento = {
      titulo: newEvent.title,
      prestador: newEvent.provider,
      cliente: newEvent.client,
      inicio: newinicio.toISOString(),
      fim: newfim.toISOString(),
      descricao: newEvent.description,
    };
  
    // Função assíncrona para adicionar o agendamento
    try {
      const createdAgendamento = await createAgendamento(novoAgendamento);

      setEventos([...eventos, { id:createdAgendamento.id, title: createdAgendamento.titulo, start: newinicio, end: newfim }]);

      resetEvent()

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    } 
  
    // Fecha o modal
    setModalOpen(false);
  };  

  // Função para mudar para o próximo mês
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Função para mudar para o mês anterior
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Função para ir para o mês atual
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((dataForm) => ({
      ...dataForm,
      [name]: value
    }));
  };

  const handleSelectEvent = async (event) => {

    const createdAgendamento = await getAgendamentoById(event.id);

    const dateObjectInicio = new Date(createdAgendamento.inicio);
    const dateInicio = dateObjectInicio.toLocaleDateString('en-CA');
    const timeInicio = dateObjectInicio.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const dateObjectFim = new Date(createdAgendamento.fim);
    const dateFim = dateObjectFim.toLocaleDateString('en-CA');
    const timeFim = dateObjectFim.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const dadosPreCadastrados = {
      id: createdAgendamento.id,
      title: createdAgendamento.titulo, 
      startDate: dateInicio,
      startTime: timeInicio,
      endDate: dateFim,
      endTime: timeFim,
      provider: createdAgendamento.prestador,
      client: createdAgendamento.cliente,
      description: createdAgendamento.descricao
    };

    setFormData(dadosPreCadastrados);
    setModalOpenEdit(true);
  };

  const handleEditEvent = async () => {
    // Crie um novo evento que corresponda à interface Agendamento
    let inicio = `${formData.startDate}T${formData.startTime}:00`;  
    let newinicio = new Date(inicio)

    let fim = `${formData.endDate}T${formData.endTime}:00`;
    let newfim = new Date(fim)

    const editaAgendamento: Agendamento = {
      titulo: formData.title,
      prestador: formData.provider,
      cliente: formData.client,
      inicio: newinicio.toISOString(),
      fim: newfim.toISOString(),
      descricao: formData.description,
    };
  
    // Função assíncrona para adicionar o agendamento
    try {
      const editedAgendamento = await updateAgendamento(formData.id, editaAgendamento);

      const eventosAtualizados = eventos.map((evento) => 
        evento.id === formData.id
          ? { id: formData.id, title: editaAgendamento.titulo, start: newinicio, end: newfim }
          : evento
      );

      setEventos(eventosAtualizados);

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    } 
  
    // Fecha o modal
    setModalOpenEdit(false);
  };

  const handleDeleteEvent = async () => {

    try {
      const editedAgendamento = await deleteAgendamento(formData.id);

      const eventosAtualizados = eventos.filter((evento) => evento.id !== formData.id);
  
  setEventos(eventosAtualizados);

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  
    // Fecha o modal
    setModalOpenEdit(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center relative mb-4">
        <h2 className="grid place-content-center text-2xl font-bold">Agenda de Prestação de Serviços</h2>
        <Button variant="secondary" className='absolute right-0 top-0' onClick={handleSelectSlot} > <IoIosAdd />Adicionar Novo</Button>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-start mb-4 gap-5"> 
        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className='flex items-center'>{format(currentDate, "MMMM yyyy", { locale: ptBR })}</div>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        popup={true}  
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={['month']}
        messages={messages}  // Definir as mensagens em português
        toolbar={false}  // Desabilitar o toolbar nativo para usar os botões customizados
        date={currentDate}  // Controlar a data atual
        onNavigate={(newDate) => setCurrentDate(newDate)}  // Navegação manual
      />
    {/* Modal de Adicionar Evento */}
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-5/6">
          <div className='relative flex justify-center mb-8 py-4 border-b-2 border-black/[.55]  '>
            <Button variant="secondary" onClick={() => setModalOpen(false)} className="mr-2 absolute top-0 left-0">Cancelar</Button>
            <h2 className="text-xl mb-4 font-bold">Cadastro Agendamento</h2>
          </div>      
          <div className="grid grid-cols-3 gap-10 mb-16">
            
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="titulo">Título do Evento</Label>
              <Input 
                type="text" 
                id="titulo" 
                placeholder="Adicione um Título" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>            

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="startDate">Data de Início:</Label>
              <div className='flex gap-4'>
                <Input 
                  className="grid w-full"
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  value={newEvent.startDate} 
                  onChange={handleInputChange}
                />

                <Input 
                  className="grid w-1/3"
                  type="time" 
                  id="startTime" 
                  name="startTime" 
                  value={newEvent.startTime} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="endDate">Data Final:</Label>
              <div className='flex gap-4'>
                <Input 
                  className="grid w-full"
                  type="date" 
                  id="endDate" 
                  name="endDate" 
                  value={newEvent.endDate} 
                  onChange={handleInputChange}
                />

                <Input 
                  className="grid w-1/3"
                  type="time" 
                  id="endTime" 
                  name="endTime" 
                  value={newEvent.endTime} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="descricao">Descrição</Label>
              <Input 
                type="text" 
                id="descricao" 
                placeholder="Adicione uma Descrição" 
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="prestador">Prestador</Label>
              <Select
                value={newEvent.provider} // Define o valor atual do provider
                onValueChange={(value) => setNewEvent({ ...newEvent, provider: value })} // Atualiza o estado ao mudar
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o Prestador" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {providers.map((provider) => (
                    <SelectItem value={provider.id} key={provider.id}>
                      {provider.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="cliente">Cliente</Label>
              <Select
                value={newEvent.client} // Define o valor atual do client
                onValueChange={(value) => setNewEvent({ ...newEvent, client: value })} // Atualiza o estado ao mudar
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

          </div>
          <div className="flex justify-end">            
            <Button className='bg-blue-500 text-white hover:bg-blue-600' onClick={handleSaveEvent}>Cadastrar</Button>
          </div>
        </div>
      </div>
    )}

    {/* Modal de Adicionar Evento */}
    {isModalOpenEdit && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-5/6">
          <div className='relative flex justify-center mb-8 py-4 border-b-2 border-black/[.55]  '>
            <Button variant="secondary" onClick={() => setModalOpenEdit(false)} className="mr-2 absolute top-0 left-0">Cancelar</Button>
            <h2 className="text-xl mb-4 font-bold">Editar Agendamento</h2>
          </div>           
          <div className="grid grid-cols-3 gap-10 mb-16">
            
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="titulo">Título do Evento</Label>
              <Input 
                type="text" 
                id="titulo" 
                placeholder="Adicione um Título" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>            

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="startDate">Data de Início:</Label>
              <div className='flex gap-4'>
                <Input 
                  className="w-full"
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChangeEdit}
                />

                <Input 
                  className="w-1/3"
                  type="time" 
                  id="startTime" 
                  name="startTime" 
                  value={formData.startTime} 
                  onChange={handleInputChangeEdit}
                />
              </div>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="endDate">Data Final:</Label>
              <div className='flex gap-4'>
                <Input 
                  className="w-full"
                  type="date" 
                  id="endDate" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleInputChangeEdit}
                />

                <Input 
                  className="w-1/3"
                  type="time" 
                  id="endTime" 
                  name="endTime" 
                  value={formData.endTime} 
                  onChange={handleInputChangeEdit}
                />
              </div>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="descricao">Descrição</Label>
              <Input 
                type="text" 
                id="descricao" 
                placeholder="Adicione uma Descrição" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="prestador">Prestador</Label>
              <Select
                value={formData.provider} // Define o valor atual do provider
                onValueChange={(value) => setFormData({ ...formData, provider: value })} // Atualiza o estado ao mudar
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um Prestador" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {providers.map((provider) => (
                    <SelectItem value={provider.id} key={provider.id}>
                      {provider.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor="cliente">Cliente</Label>
              <Select
                value={formData.client} // Define o valor atual do client
                onValueChange={(value) => setFormData({ ...formData, client: value })} // Atualiza o estado ao mudar
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um Cliente" />
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

          </div>
          <div className="flex justify-between">
            <Button variant="destructive" onClick={() => setOpen(true)}>Excluir Agendamento</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="hidden">Abrir popup</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmação de Exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza de que deseja excluir este item? Essa ação não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteEvent}>
                    Confirmar Exclusão
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className='bg-blue-500 text-white hover:bg-blue-600' onClick={handleEditEvent}>Editar</Button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default CalendarioAgendamento;
