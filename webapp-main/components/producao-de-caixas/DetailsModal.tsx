import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Interface para o modal de detalhes
interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  box: {
    id: string;
    brand: string;
    quantity: number;
    date: string;
    category: string;
    mountedBy?: { user: string; quantity: number }[]; // Histórico de montagem
  };
  onRegisterMount: (user: string, quantity: number) => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, box, onRegisterMount }) => {
  const [montador, setMontador] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  if (!isOpen) return null;

  const handleAddMount = () => {
    if (montador && quantidade > 0) {
      onRegisterMount(montador, quantidade); // Envia os dois argumentos separados
      setMontador("");
      setQuantidade(0);
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Detalhes da Demanda</h2>
        <p><strong>Marca:</strong> {box.brand}</p>
        <p><strong>Quantidade Total:</strong> {box.quantity}</p>
        <p><strong>Categoria:</strong> {box.category}</p>
        <p><strong>Data:</strong> {box.date}</p>
        <p><strong>Quantidade Restante:</strong> {box.quantity - (box.mountedBy?.reduce((sum, item) => sum + item.quantity, 0) || 0)}</p>

        <hr className="my-4" />

        <div>
          <h3 className="font-bold">Registrar Montagem</h3>
          <div className="mb-2">
            <label className="block text-sm font-medium">Montador:</label>
            <input
              type="text"
              value={montador}
              onChange={(e) => setMontador(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Digite o nome do montador"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Quantidade Montada:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Digite a quantidade"
            />
          </div>
          <Button
                onClick={handleAddMount}
                disabled={
                    quantidade <= 0 ||
                    quantidade > (box.quantity - (box.mountedBy?.reduce((sum, item) => sum + item.quantity, 0) || 0))
                }
                >
                Adicionar
          </Button>


        </div>

        <hr className="my-4" />

        <div>
          <h3 className="font-bold">Histórico de Montagem</h3>
          {box.mountedBy && box.mountedBy.length > 0 ? (
            <ul className="list-disc ml-5">
              {box.mountedBy.map((entry, index) => (
                <li key={index}>
                  {entry.user} montou {entry.quantity} caixas.
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Nenhuma montagem registrada.</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
