import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ModalMontadorProps {
  formData: {
    id: string;
    name: string;
    cpf: string;
    birthdate: string;
  };
  onClose: () => void;
  onSave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  modalMode: "create" | "edit";
}

export const ModalMontador: React.FC<ModalMontadorProps> = ({
  formData,
  onClose,
  onSave,
  onInputChange,
  modalMode,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">
          {modalMode === "create" ? "Adicionar Montador" : "Editar Montador"}
        </h2>
        <Input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Nome"
          className="mb-2"
        />
        <Input
          name="cpf"
          value={formData.cpf}
          onChange={onInputChange}
          placeholder="CPF"
          className="mb-2"
        />
        <Input
          name="birthdate"
          value={formData.birthdate}
          onChange={onInputChange}
          placeholder="Data de Nascimento"
          className="mb-2"
        />
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={onSave}>
            {modalMode === "create" ? "Adicionar" : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
