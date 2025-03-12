import axios from "axios";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

// Componente funcional que exibe um cartão de confirmação para deletar um evento.
const DeleteCard = (props) => {
    console.log(props.event); // Log do evento passado como propriedade para debug

    // Função assíncrona para deletar o evento
    async function deleteEvent() {
        try {
            // Faz uma requisição DELETE para deletar o evento pelo ID
            await axios.delete(`http://localhost:3001/calendario/${props.event.id}`);
            alert('Evento deletado com sucesso!'); // Alerta de sucesso
            props.onClose(); // Fecha o modal
        } catch (error) {
            console.error('Erro ao deletar evento:', error); // Log do erro
        }
    }

    return (
        // Fundo escuro semi-transparente que cobre toda a tela, centralizando o conteúdo
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                {/* Título de confirmação de exclusão */}
                <h1 className="text-2xl font-bold mb-4 text-center text-destructive">Confirmar Exclusão</h1>
                {/* Texto explicativo pedindo confirmação do usuário */}
                <p className="text-lg text-center mb-6">Tem certeza que deseja excluir o evento <strong>{props.event.title}</strong>?</p>
                <div className="flex justify-between">
                    {/* Botão para excluir o evento, chamando a função deleteEvent */}
                    <Button 
                        onClick={deleteEvent} 
                        className="bg-destructive py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    >
                        Excluir Evento
                    </Button>
                    {/* Botão para cancelar a ação e fechar o modal */}
                    <Button 
                        onClick={props.onClose} 
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                    >
                        Cancelar
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DeleteCard;
