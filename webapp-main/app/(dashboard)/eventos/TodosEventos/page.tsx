'use client'
import EditGeral from "@/components/eventos/EditGeral";
import TodosEventos from "@/components/eventos/TodosEventos";
import { useState } from "react";

const TodosEventosPag = () => {
    const [evento, setEvento] = useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0); // Estado para forçar a re-renderização

    const handleClick = (e) => {
     
        setEvento(e);
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
        setRefreshKey(oldKey => oldKey + 1); // Incrementa o refreshKey para forçar a re-renderização
    }

    return (
        <div>
            <TodosEventos key={refreshKey} isEdit={true} onClick={handleClick} />
            {isModalOpen && (
                <EditGeral event={evento} onClose={handleClose} />
            )}
        </div>
    );
}

export default TodosEventosPag;
