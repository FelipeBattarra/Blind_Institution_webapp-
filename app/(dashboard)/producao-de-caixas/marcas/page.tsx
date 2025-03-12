"use client";

import React, { useState, useEffect } from "react";
import { DataTableMarcas } from "@/components/producao-de-caixas/DataTableMarcas";
import { ModalMarca } from "@/components/producao-de-caixas/ModalMarca";
import { createMarca, deleteMarca, editMarca, getMarcas } from "@/api/producao-de-caixas/marcas";
import { Marca } from "@/models/producao-de-caixas/Marca";

const MarcasPage: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null);
  const [formData, setFormData] = useState<Marca>({
    id: "",
    nome: "",
  });

  // Carregar as marcas ao carregar a página
  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await getMarcas();
      setMarcas(response.data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (mode: "create" | "edit", marca?: Marca) => {
    setModalMode(mode);
    setSelectedMarca(marca || null);
    setFormData(
      marca || {
        id: "",
        name: "",
      }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      id: "",
      name: "",
    });
    setSelectedMarca(null);
  };

  const handleSubmit = async (e) => {
    console.log (e);

    try {
      if (modalMode === "create") {
        await createMarca(formData);
      } else if (modalMode === "edit" && selectedMarca) {
        await editMarca(formData);
      }
      fetchMarcas();
      handleCloseModal(); // Fechar o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar marca:", error);
    }
  };

  const handleDelete = async (marca: Marca) => {
    try {
      await deleteMarca(marca.id);
      fetchMarcas();
    } catch (error) {
      console.error("Erro ao deletar marca:", error);
    }
  };

  const handleEdit = (marca: Marca) => {
    handleOpenModal("edit", marca);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marcas</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleOpenModal("create")}
      >
        Adicionar Marca
      </button>

      <div className="mt-4">
        {marcas?.length > 0 && (
            <DataTableMarcas
            data={marcas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isModalOpen && (
        <ModalMarca
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

export default MarcasPage;
