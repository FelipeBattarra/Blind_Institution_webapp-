import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

// Componente funcional que exibe um aviso sobre um evento.
const Aviso = (props) => {
   
   return (
      // Fundo escuro semi-transparente que cobre toda a tela, centralizando o conteúdo.
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            {/* Título do evento, com emojis para destacar */}
            <h2 className="text-2xl font-bold mb-4 text-primary">🎉 {props.event.title} 🎉</h2>
            {/* Texto explicativo sobre o evento */}
            <p className="text-lg mb-6">No ano passado nessa data foi <strong>{props.event.title}</strong>, talvez você queira adicionar um evento esse ano também.</p>
            <div className="flex justify-around">
               {/* Botão para fechar o aviso, armazenando um valor no localStorage */}
               <Button
                  onClick={() => { localStorage.setItem("Opened", "true"); props.onClose(); }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
               >
                  Fechar
               </Button>
               {/* Botão para adicionar um novo evento, armazenando um valor no sessionStorage */}
               <Button 
                  onClick={() => { sessionStorage.setItem("Opened", "true"); props.onClick(); }}
                  className=" py-2 px-4 "
               >
                  Adicionar Evento
               </Button>
            </div>
         </Card>
      </div>
   );
};

export default Aviso;
