import React, { useState } from "react";
import Modal from "@/components/producao-de-caixas/modal"; // Supondo que o Modal esteja no caminho correto
import { Input } from "@/components/ui/input"; // Supondo que o Input esteja no caminho correto
import { Button } from "@/components/ui/button"; // Supondo que o Button esteja no caminho correto

type ModalMarcaProps = {
  onClose: () => void;
  onSave: (formData: Marca) => void;
  formData: Marca;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  modalMode: "create" | "edit";
};

type Marca = {
  id: string;
  name: string;
};

export const ModalMarca: React.FC<ModalMarcaProps> = ({
  onClose,
  onSave,
  formData,
  onInputChange,
  modalMode,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          {modalMode === "create" ? "Adicionar Marca" : "Editar Marca"}
        </h2>
        <form >
          <div className="mb-4">
            <label className="block font-bold">Nome</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="border px-2 py-1 w-full"
            />
          </div>
          <div className="flex justify-between">
            <Button
            type="button"
              onClick={() => onSave(formData)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Salvar
            </Button>
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
