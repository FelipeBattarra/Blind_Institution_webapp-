"use client";

import React, { useState } from "react";

type Props = {
  onClose: () => void; // Função para fechar o modal
};

const AddCartonagemModal = ({ onClose }: Props) => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telephone, setTelephone] = useState("");

  // Função para salvar a cartonagem
  const handleSave = () => {
    const newCartonagem = {
      id: crypto.randomUUID(), // Gera um ID único
      name,
      cnpj,
      telephone,
    };

    console.log("Nova Cartonagem Adicionada:", newCartonagem);

    // Aqui você pode enviar `newCartonagem` para um backend ou salvar no estado global

    // Fecha o modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Adicionar Nova Cartonagem</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome da cartonagem"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="Digite o CNPJ"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Digite o telefone"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCartonagemModal;
