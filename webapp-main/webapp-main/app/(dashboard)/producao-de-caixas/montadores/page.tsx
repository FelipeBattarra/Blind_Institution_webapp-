"use client";

import React, { useState, useEffect } from "react";
import { DataTableMontadores } from "@/components/producao-de-caixas/DataTableMontadores";
import { ModalMontador } from "@/components/producao-de-caixas/ModalMontadores";
import { Montador } from "@/models/producao-de-caixas/Montadores";
import { createMontadores, deleteMontadores, editMontadores, getMontadores } from "@/api/producao-de-caixas/montador";



const MontadoresPage: React.FC = () => {
  const [montadores, setMontadores] = useState<Montador[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedMontador, setSelectedMontador] = useState<Montador | null>(null);
  const [formData, setFormData] = useState<Montador>({
    id: "",
    name: "",
    cpf: "",
    birthdate: "",
  });

  // Carregar os montadores ao carregar a página
  useEffect(() => {
    fetchMontadores();
  }, []);

  const fetchMontadores = async () => {
    try {
      const response = await getMontadores();
      setMontadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar montadores:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (mode: "create" | "edit", montador?: Montador) => {
    setModalMode(mode);
    setSelectedMontador(montador || null);
    setFormData(
      montador || {
        id: "",
        name: "",
        cpf: "",
        birthdate: "",
      }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      id: "",
      name: "",
      cpf: "",
      birthdate: "",
    });
    setSelectedMontador(null);
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "create") {
        await createMontadores(formData) ;
      } else if (modalMode === "edit" && selectedMontador) {
        await editMontadores(selectedMontador.id), formData;
      }
      fetchMontadores();
      handleCloseModal(); 
    } catch (error) {
      console.error("Erro ao salvar montador:", error);
    }
  };

  const handleDelete = async (montador: Montador) => {
    try {
      await deleteMontadores(montador.id);
      fetchMontadores();
    } catch (error) {
      console.error("Erro ao deletar montador:", error);
    }
  };

  const handleEdit = (montador: Montador) => {
    handleOpenModal("edit", montador);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Montadores</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleOpenModal("create")}
      >
        Adicionar Montador
      </button>

      <div className="mt-4">
        <DataTableMontadores
          data={montadores}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <ModalMontador
          onClose={handleCloseModal}
          onSave={handleSubmit}
          formData={formData}
          onInputChange={handleInputChange}
          modalMode={modalMode}
        />
      )}
    </div>
  );
};

export default MontadoresPage;
