import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
//Desabilitado, substituido por EditGeral
const AddEventPage = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        body: '',
        autor: '',
        txtTitle: '',
        publish: true  // Default value set to true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (event) {
            // Preenche os dados do formulário se o evento já existir
            setFormData({
                body: event.body || '',
                autor: event.autor || '',
                txtTitle: event.txtTitle || '',
                publish: event.publish !== undefined ? event.publish : true  // Mantém o valor de publish se definido, caso contrário, usa true
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.patch(`http://localhost:3001/calendario/${event.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Evento salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            alert('Erro ao salvar evento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-primary">Adicionar Página de Evento</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Título:</label>
                        <input
                            type="text"
                            name="txtTitle"
                            value={formData.txtTitle}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Autor:</label>
                        <input
                            type="text"
                            name="autor"
                            value={formData.autor}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Descrição:</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="publish"
                            checked={formData.publish}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <label className="ml-2 block text-sm leading-5 text-gray-900">Publicar no site</label>
                    </div>
                    <Button
                        type="submit"
                        className="py-2 px-4 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar Evento'}
                    </Button>
                    <Button
                        type="button"
                        onClick={onClose}
                        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full hover:bg-gray-600 transition duration-300"
                    >
                        Fechar
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddEventPage;
