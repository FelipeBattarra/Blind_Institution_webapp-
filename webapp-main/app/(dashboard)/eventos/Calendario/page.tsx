'use client'

import React, { useState } from 'react';
import TelaSelecao from '@/components/eventos/TelaSelecao';
import EditTable from '@/components/eventos/EditTable';
import Calendar from '@/components/eventos/Calendar';
import { Card } from '@/components/ui/card';
import AddEventPage from '@/components/eventos/AddEventPage';
import DeleteCard from '@/components/eventos/DeleteCard';
import EditGeral from '@/components/eventos/EditGeral';

// Componente funcional principal que gerencia o calendário e modais
function CalendarioP() {
  // Estados para gerenciar a abertura dos modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [eventos, setEvents] = useState([]);
  const [evento, setEvento] = useState([]);
  const [editState, setEditState] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteOpen, setIsDeleteTable] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forçar a re-renderização

  // Função para gerenciar a abertura do modal
  function modalHandler(events, isDelete) {
    //console.log(isDelete);
    setIsDelete(isDelete);
    
    if (!events.length) {
      setEvento(events);
      if (isDelete) {
        setIsDeleteTable(true);
      }
     else {
        setEditOpen(true);
      }
    } else {
      setEvents(events);
      setIsModalOpen(true);
    }
  }

  // Função para gerenciar a edição do evento selecionado
  function editHandler(eve) {
    setEvento(eve);
    if (isDelete) {
      setIsDeleteTable(true);
    }
    else {
      setEditOpen(true);
    }
    setIsModalOpen(false);
  }

  // Função para gerenciar o estado de edição
  function isEditableManager(editState) {
    setEditState(editState);
  }
const closeHandler = () =>{
  if(isEditOpen){
    setEditOpen(false);
    
  }
  else{
    setIsDeleteTable(false);
  }
  setRefreshKey(oldKey => oldKey + 1); // Incrementa o refreshKey para forçar a re-renderização
}
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className='rounded-2xl p-10 m-10'>
          <Calendar key={refreshKey} onClick={modalHandler} isEditable={isEditableManager} />
        </Card>
      </div>
      {isModalOpen && (
        <TelaSelecao event={eventos} onClose={() => setIsModalOpen(false)} click={editHandler} isEditable={editState} />
      )}
      {isEditOpen && (
        <EditGeral event={evento} onClose={closeHandler} />
      )}
      {isDeleteOpen && (
        <DeleteCard event={evento} onClose={closeHandler} />
      )}
    </div>
  );
}

export default CalendarioP;
