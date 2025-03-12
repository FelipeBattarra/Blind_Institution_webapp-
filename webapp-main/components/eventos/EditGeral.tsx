import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import { Card } from '../ui/card'; // Importa o componente Card
import { Button } from '../ui/button'; // Importa o componente Button
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'; // Importa componentes do Accordion

const EventModal = ({ event, onClose }) => {
    // Define o estado inicial do formulário
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        description: '',
        body: '',
        autor: '',
        txtTitle: '',
        publish: false
    });
    const [loading, setLoading] = useState(false); // Estado para controlar o loading
    const [image, setImage] = useState(null); // Estado para a imagem importada

    useEffect(() => {
        if (event) {
            // Preenche os dados do formulário se o evento já existir
            setFormData({
                date: event.date || '',
                title: event.title || '',
                description: event.description || '',
                body: event.body || '',
                autor: event.autor || '',
                txtTitle: event.txtTitle || '',
                publish: event.publish !== undefined ? event.publish : false
            });
        }
    }, [event]); // useEffect é executado quando a prop event muda

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (type === 'file' && files.length > 0) {
            setImage(URL.createObjectURL(files[0])); // Atualiza o estado da imagem com a URL da imagem selecionada
        }
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setLoading(true); // Ativa o estado de loading

        // Verifica se é um novo evento (sem ID) ou um evento existente (com ID)
        const isNewEvent = !event || !event.id;

        try {
            if (isNewEvent) {
                // Faz uma requisição POST para criar um novo evento
                await axios.post('http://localhost:3001/calendario', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('Evento criado com sucesso!');
            } else {
                // Faz uma requisição PATCH para atualizar o evento existente
                await axios.patch(`http://localhost:3001/calendario/${event.id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('Evento atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao salvar evento:', error); // Loga o erro no console
            alert('Erro ao salvar evento.'); // Mostra um alerta de erro
        } finally {
            setLoading(false); // Desativa o estado de loading
        }
    };

    return (
        // Modal que cobre a tela inteira com fundo escuro
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-primary">Editar Evento</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Data:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
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
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Descrição:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="4"
                            required
                        />
                    </div>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Configurações de publicação no site (Opicional)</AccordionTrigger>
                            <AccordionContent>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Título do Texto:</label>
                                    <input
                                        type="text"
                                        name="txtTitle"
                                        value={formData.txtTitle}
                                        onChange={handleChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        required={formData.publish} // Campo obrigatório se publish for true
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Autor:</label>
                                    <input
                                        type="text"
                                        name="autor"
                                        value={formData.autor}
                                        onChange={handleChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        required={formData.publish} // Campo obrigatório se publish for true
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Importar Imagem:</label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {image && <img src={image} alt="Preview" className="mt-4 w-full h-64 object-cover rounded" />}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Conteúdo:</label>
                                    <textarea
                                        name="body"
                                        value={formData.body}
                                        onChange={handleChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows="4"
                                        required={formData.publish} // Campo obrigatório se publish for true
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="publish"
                                        checked={formData.publish}

                                        onChange={handleChange}
                                        className="form-checkbox  accent-primary h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <label className="ml-2 block text-sm leading-5 text-gray-900">Publicar no site</label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
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
                        className="mt-4 py-2 px-4 rounded w-full bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
                    >
                        Fechar
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default EventModal;
