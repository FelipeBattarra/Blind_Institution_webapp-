"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/producao-de-caixas/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Se você estiver usando Input para outros campos

interface Box {
  id: string;
  brand: string;
  quantity: number;
  date: string;
  category: string;
}

interface AddBoxModalProps {
  onClose: () => void;
  onSave: (newBox: Box) => void;
  onDelete: (box: Box) => void; // Deve ser um box, não boxId
  editingBox: Box | null;
}



const AddBoxModal: React.FC<AddBoxModalProps> = ({
  onClose,
  onSave,
  onDelete,
  editingBox,
}) => {
  const [boxData, setBoxData] = useState<Box>({
    id: "",
    brand: "",
    quantity: 0,
    date: "",
    category: "Montada", 
  });

  useEffect(() => {
    if (editingBox) {
      setBoxData(editingBox);
    }
  }, [editingBox]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBoxData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(boxData);
  };

  return (
    <Modal onClose={onClose}>
      <h2>{editingBox ? "Editar Demanda" : "Adicionar Demanda"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="brand">Marca:</label>
          <Input
            type="text"
            id="brand"
            name="brand"
            value={boxData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade:</label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={boxData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <Input
            type="date"
            id="date"
            name="date"
            value={boxData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            name="category"
            value={boxData.category}
            onChange={handleChange}
            required
          >
            
            <option value="Desmontada">Desmontada</option>
          </select>
        </div>
        <Button type="submit">{editingBox ? "Salvar Alterações" : "Adicionar Demanda"}</Button>
        <Button type="button" onClick={() => {
  if (editingBox) {
    onDelete(editingBox);  // Passa o objeto da caixa para a função onDelete
    onClose();  // Fecha o modal após deletar
  }
}}>
  Deletar
</Button>



        <Button type="button" onClick={onClose}>Cancelar</Button>
        
      </form>
    </Modal>
  );
};

export default AddBoxModal;