import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dia from './Dia';
import { Button } from '../ui/button';

// Array com os dias da semana
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

// Componente funcional que exibe um calendário
const Calendar = ({ onClick, isEditable }) => {
  // Definindo os estados para armazenar a data atual, eventos e o modo de edição
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(false);

  // useEffect para buscar os eventos ao montar o componente ou mudar a data atual, recebe todos os eventos do banco
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/calendario');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, [currentDate]);

  // Função para gerenciar a abertura do modal
  const modalManager = (eventos, isDelete) => {
    onClick(eventos, isDelete);
  };

  // Função para obter o número de dias em um mês
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Função para obter o dia da semana do primeiro dia do mês
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Função para mudar o mês exibido no calendário
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  // Função para ajustar a data para o horário de Brasília
  const adjustToBrasiliaTime = (date) => {
    const offset = -3; // Offset para BRT (Horário de Brasília)
    const utcDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
    return new Date(utcDate.getTime() + (offset * 3600000));
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Obtendo o número de dias no mês atual e o primeiro dia da semana
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  // Função para formatar a data no padrão YYYY-MM-DD
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        {/* Botão para mudar para o mês anterior */}
        <Button onClick={() => changeMonth(-1)}>Anterior</Button>
        <h2 className="text-xl font-bold">
          {capitalizeFirstLetter(currentDate.toLocaleString('default', { month: 'long' }))} {currentDate.getFullYear()}
        </h2>
        {/* Botão para mudar para o próximo mês */}
        <Button onClick={() => changeMonth(1)}>Próximo</Button>
      </div>
      <div className="flex justify-end mb-4">
        <Button 
          className="mb-2" 
          onClick={() => { setEdit(!edit); isEditable(!edit); }}
        >
          Editar
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Renderização dos dias da semana */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {/* Renderização dos espaços vazios antes do primeiro dia do mês */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {/* Renderização dos dias do mês */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
          const dayEvents = events.filter(event => event.date === dateStr);

          return (
            <Dia
              key={i + 1}
              dia={i + 1}
              date={dateStr}
              eventos={dayEvents}
              isEditable={edit}
              onClick={modalManager}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
