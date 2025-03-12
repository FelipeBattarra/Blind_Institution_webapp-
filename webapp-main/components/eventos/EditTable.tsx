import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

// Componente funcional para adicionar ou editar um evento
const EditTable = (props) => {
    console.log(props); // Log dos props para debug
    const [formData, setFormData] = useState({
        date: '',
        title: '', 
        description: '',
        publish: false
    });

    // useEffect para preencher o formulário com os dados do evento passado via props
    useEffect(() => {
        const { date, title, description } = props.event;
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: date || '',
            title: title || '',
            description: description || ''
        }));
    }, [props.event]);

    // Função para atualizar o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Função para enviar os dados do formulário para o servidor
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id } = props.event;
        try {
            if(id == null){
                // Faz uma requisição POST se o evento não existir (criação de novo evento)
                await axios.post('http://localhost:3001/calendario', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                // Faz uma requisição PATCH se o evento já existir (edição de evento)
                await axios.patch(`http://localhost:3001/calendario/${id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            alert('Evento salvo com sucesso!'); // Alerta de sucesso
        } catch (error) {
            console.error('Erro ao salvar evento:', error); // Log do erro
            alert('Erro ao salvar evento.'); // Alerta de erro
        }
    };

    return (
        // Fundo escuro semi-transparente que cobre toda a tela, centralizando o conteúdo
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-primary">Adicionar/Editar Evento</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Data:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Descrição:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="py-2 px-4 rounded w-full"
                    >
                        Salvar Evento
                    </Button>
                    <Button
                        type="button"
                        onClick={props.onClose}
                        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full hover:bg-gray-600 transition duration-300"
                    >
                        Fechar
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default EditTable;
