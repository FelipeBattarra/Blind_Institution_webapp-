"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTableCartonagens } from "@/components/producao-de-caixas/DataTableCartonagens";
import Modal from "@/components/producao-de-caixas/modalCartonagem";
import { Cartonagem } from "@/models/producao-de-caixas/Cartonagem";
import { createCartonagens, deleteCartonagens, editCartonagens, getCartonagens } from "@/api/producao-de-caixas/cartonagem";


const CartonagensPage: React.FC = () => {
  const [cartonagens, setCartonagens] = useState<Cartonagem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCartonagem, setSelectedCartonagem] = useState<Cartonagem | null>(null);

  const [formData, setFormData] = useState<Cartonagem>({
    id: "",
    name: "",
    cnpj: "",
    telephone: "",
  });

  // Carregar as cartonagens ao carregar a página
  useEffect(() => {
    fetchCartonagens();
  }, []);

  const fetchCartonagens = async () => {
    try {
      const response = await getCartonagens();
      setCartonagens(response.data);
    } catch (error) {
      console.error("Erro ao buscar cartonagens:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (mode: "create" | "edit", cartonagem?: Cartonagem) => {
    setModalMode(mode);
    setSelectedCartonagem(cartonagem || null);
    setFormData(
      cartonagem || {
        id: "",
        name: "",
        cnpj: "",
        telephone: "",
      }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      id: "",
      name: "",
      cnpj: "",
      telephone: "",
    });
    setSelectedCartonagem(null);
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "create") {
        await createCartonagens(formData) ;
      } else if (modalMode === "edit" && selectedCartonagem) {
        await editCartonagens(selectedCartonagem.id), formData;
      }
      fetchCartonagens();
      handleCloseModal(); // Fechar o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar cartonagem:", error);
    }
  };

  const handleDelete = async (cartonagem: Cartonagem) => {
    try {
      await deleteCartonagens(cartonagem.id);
      fetchCartonagens();
    } catch (error) {
      console.error("Erro ao deletar cartonagem:", error);
    }
  };

  const handleEdit = (cartonagem: Cartonagem) => {
    handleOpenModal("edit", cartonagem);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cartonagens</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleOpenModal("create")}
      >
        Adicionar Cartonagem
      </button>

      <div className="mt-4">
        <DataTableCartonagens
          data={cartonagens}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">
            {modalMode === "create" ? "Adicionar Cartonagem" : "Editar Cartonagem"}
          </h2>
          <form>
            <div className="mb-4">
              <label className="block font-bold">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.name}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CartonagensPage;
