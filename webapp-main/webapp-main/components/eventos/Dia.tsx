import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import Link from "next/link";

// Componente funcional para renderizar um dia específico do calendário
function Dia(props) {
  // Função para adicionar um novo evento
  function addNew() {
    const newEvent = {
      id: null,
      date: props.date,
      title: null,
      description: null,
    };
    props.onClick(newEvent, false);
  }

  // Função para renderizar os botões de evento
  const renderEventButtons = (e) => {
    if(e === true){
      return(
        <div className="flex size-x-1">
          <FaPlus
            onClick={addNew}
            title="Adicionar novo evento"
            className="text-primary cursor-pointer"
          />
          <FaEdit
            onClick={() => props.onClick(props.eventos[0],false)}
            title="Editar evento"
            className="text-primary cursor-pointer"
          />
          <FaTrash
            onClick={() => props.onClick(props.eventos[0],true)}
            title="Excluir evento"
            className="text-primary cursor-pointer"
          />
        </div>
      );
    } else {
      return (
        <div className="flex size-x-1">
          <FaPlus
            onClick={addNew}
            title="Adicionar novo evento"
            className="text-primary cursor-pointer"
          />
          <FaEdit
            onClick={() => props.onClick(props.eventos,false)}
            title="Editar evento"
            className="text-primary cursor-pointer"
          />
          <FaTrash
            onClick={() => props.onClick(props.eventos,true)}
            title="Excluir evento"
            className="text-primary cursor-pointer"
          />
        </div>
      );
    }
  };

  // Classes de estilo para os cards
  const cardClass = "w-full sm:w-16 sm:h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 xl:w-36 xl:h-36 2xl:44 2xl:40 flex flex-col justify-between m-1 hover:bg-blue-100 transition duration-300 cursor-pointer";
  const cardClassEdit = "w-full sm:w-16 sm:h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 xl:w-36 xl:h-36 2xl:44 2xl:40 bg-secondary flex flex-col justify-between m-1";

  // Renderização condicional do card, dependendo do estado editável e do número de eventos
  if (props.isEditable) {
    if (props.eventos.length > 0) {
      if (props.eventos.length <= 1) {
        return (
          <Card className={cardClassEdit}>
            <CardHeader className="lg:p-1 xl:p-4">
              {renderEventButtons(true)}
              <CardTitle className="lg:text-md text-right p-0">{props.dia}</CardTitle>
            </CardHeader>
            <div className="flex-grow"></div>
            <CardFooter className="md:text-xs">
              <p className="truncate ...">{props.eventos[0].title}</p>
            </CardFooter>
          </Card>
        );
      } else {
        return (
          <Card className={cardClassEdit}>
            <CardHeader className="lg:p-1 xl:p-4">
              {renderEventButtons(false)}
              <CardTitle className="lg:text-md text-right p-0">{props.dia}</CardTitle>
            </CardHeader>
            <div className="flex-grow"></div>
            <CardFooter className="md:text-xs">
              <p className="truncate ...">{props.eventos[0].title}</p>
              <p className="ml-1 text-xs">+{props.eventos.length - 1}</p>
            </CardFooter>
          </Card>
        );
      }
    } else {
      return (
        <Card className={cardClassEdit}>
          <CardHeader className="lg:p-1 xl:p-4">
            <FaPlus
              onClick={addNew}
              title="Adicionar novo evento"
              className="text-primary cursor-pointer"
            />
            <CardTitle className="text-right p-0">{props.dia}</CardTitle>
          </CardHeader>
          <div className="flex-grow"></div>
          <CardFooter></CardFooter>
        </Card>
      );
    }
  } else {
    if (props.eventos.length > 0) {
      if (props.eventos.length <= 1) {
        return (
          <Link href={{
            pathname: 'EventoPag',
            query: { id: props.eventos[0].id },
          }}>
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-right p-0">{props.dia}</CardTitle>
            </CardHeader>
            <div className="flex-grow"></div>
            <CardFooter className="md:text-xs">
              <div className="bg-blue-500 size-2 m-1 rounded-full"></div>
              <p className="truncate ...">{props.eventos[0].title}</p>
            </CardFooter>
          </Card>
          </Link>
        );
      } else {
        return (
          <Card onClick={() => props.onClick(props.eventos)} className={cardClass}>
            <CardHeader>
              <CardTitle className="text-right p-0">{props.dia}</CardTitle>
            </CardHeader>
            <div className="flex-grow"></div>
            <CardFooter className="md:text-xs">
              <div className="bg-blue-500 size-2 m-1 rounded-full"></div>
              <p className="truncate ...">
                {props.eventos[0].title} +{props.eventos.length - 1}
              </p>
            </CardFooter>
          </Card>
        );
      }
    } else {
      return (
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-right p-0">{props.dia}</CardTitle>
          </CardHeader>
          <div className="flex-grow"></div>
          <CardFooter></CardFooter>
        </Card>
      );
    }
  }
}

export default Dia;
