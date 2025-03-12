import moment from "moment";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

// Componente funcional para a tela de seleção de eventos
const TelaSelecao = (props) => {
    console.log(props); // Log dos props para debug

    return (
        // Fundo escuro semi-transparente que cobre toda a tela, centralizando o conteúdo
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="p-10 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Selecione um evento</h2>
                <div className="space-y-4">
                    {props.event.map((e, index) => (
                        props.isEditable ? (
                            // Renderização condicional dos eventos em modo editável
                            <Card 
                                key={index} 
                                onClick={() => props.click(e)} 
                                className="p-6 cursor-pointer hover:bg-blue-100 transition duration-300 rounded-lg shadow"
                            >
                                <h1 className="text-xl font-semibold">{e.title}</h1>
                            </Card>
                        ) : (
                            // Renderização dos eventos com links para suas páginas
                            <Link 
                                key={index} 
                                href={{
                                    pathname: 'EventoPag',
                                    query: { id: e.id },
                                }}
                            >
                                <Card className="p-6 cursor-pointer hover:bg-blue-100 transition duration-300 rounded-lg shadow">
                                    <h1 className="text-xl font-semibold">{e.title}</h1>
                                </Card>
                            </Link>
                        )
                    ))}
                </div>
                <Button
                    onClick={props.onClose}
                    className="mt-6 py-2 px-4 rounded w-full"
                >
                    Fechar
                </Button>
            </Card>
        </div>
    );
};

export default TelaSelecao;
