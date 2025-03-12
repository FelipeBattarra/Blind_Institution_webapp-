'use client' // Indica que este componente é um componente do lado do cliente
import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import { Card } from '../ui/card'; // Importa o componente Card
import { Button } from '../ui/button'; // Importa o componente Button
import { FaEdit } from 'react-icons/fa'; // Importa o ícone de edição
import Link from 'next/link'; // Importa o componente Link do Next.js
// Para usar no site coloque isEdit como false quando chamar o componente e adapte o link como descrito no componente ArticlePage
const TodosEventos = ({ onClick, isEdit }) => {
    const [events, setEvents] = useState([]); // Estado para armazenar os eventos
    const [currentPage, setCurrentPage] = useState(1); // Estado para armazenar a página atual
    const [filter, setFilter] = useState('all'); // Estado para armazenar o filtro atual

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/calendario'); // Faz uma requisição GET para buscar os eventos
                setEvents(response.data); // Atualiza o estado com os eventos recebidos
            } catch (error) {
                console.error('Erro ao buscar eventos:', error); // Loga o erro no console
            }
        };
        fetchEvents(); // Chama a função para buscar os eventos ao montar o componente
    }, []);

    const eventsPerPage = 10; // Número de eventos por página
    const today = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

    // Filtra os eventos com base no filtro atual, e para `isEdit` falso, apenas eventos publicados
    const filteredEvents = events.filter(event => {
        if (!isEdit && !event.publish) {
            return false; // Exibe apenas eventos publicados quando isEdit é falso
        }
        if (filter === 'futuro') {
            return event.date >= today;
        } else if (filter === 'passado') {
            return event.date < today;
        } else if (filter === 'publicado') {
            return event.publish;
        } else if (filter === 'naoPublicado') {
            return !event.publish;
        } else {
            return true;
        }
    });

    // Calcula os índices para a paginação
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent); // Pega os eventos da página atual

    // Função para ir para a próxima página
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    // Função para voltar para a página anterior
    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    // Função para mudar o filtro
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // Reseta para a primeira página ao mudar o filtro
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Eventos</h1>
            <div className="mb-4">
                <Button onClick={() => handleFilterChange('all')} className={`mr-2 ${filter === 'all' ? 'bg-blue-500 text-white' : ''}`}>Todos</Button>
                <Button onClick={() => handleFilterChange('futuro')} className={`mr-2 ${filter === 'futuro' ? 'bg-blue-500 text-white' : ''}`}>Futuros</Button>
                <Button onClick={() => handleFilterChange('passado')} className={`mr-2 ${filter === 'passado' ? 'bg-blue-500 text-white' : ''}`}>Passados</Button>
                {isEdit && (
                    <>
                        <Button onClick={() => handleFilterChange('publicado')} className={`mr-2 ${filter === 'publicado' ? 'bg-blue-500 text-white' : ''}`}>Publicados</Button>
                        <Button onClick={() => handleFilterChange('naoPublicado')} className={`${filter === 'naoPublicado' ? 'bg-blue-500 text-white' : ''}`}>Não Publicados</Button>
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentEvents.map(event => (
                    <Card key={event.id} className="p-4 h-48 overflow-hidden">
                        {isEdit ? (
                            <>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                                <h2 className="text-xl font-bold">{event.title}</h2>
                                <p className="truncate">{event.description}</p>
                                <p>{event.publish ? 'Publicado' : 'Não Publicado'}</p>
                                <FaEdit onClick={() => { onClick(event) }} className='float-right' size={24} />
                            </>
                        ) : (
                            <Link href={{
                                pathname: 'EventoPag',
                                query: { id: event.id },
                              }}>
                                <div>
                                    <p>{new Date(event.date).toLocaleDateString()}</p>
                                    <h2 className="text-xl font-bold">{event.title}</h2>
                                    <p className="truncate">{event.description}</p>
                                </div>
                            </Link>
                        )}
                    </Card>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={handleNextPage} disabled={indexOfLastEvent >= filteredEvents.length}>Próximo</Button>
            </div>
        </div>
    );
};

export default TodosEventos;
