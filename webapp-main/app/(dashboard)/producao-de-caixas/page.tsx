"use client";

import React, { useEffect, useState } from "react";
import AddBoxModal from "@/components/producao-de-caixas/AddBoxModal";
import { DataTable } from "@/components/producao-de-caixas/data-table"; 
import { Row, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"; // Certifique-se de que o caminho está correto
import DetailsModal from "@/components/producao-de-caixas/DetailsModal";

// Interface Box
interface Box {
  id: string;
  brand: string;
  quantity: number;
  date: string;
  category: string;
  mountedBy?: { user: string; quantity: number }[]; // Histórico de montagem
}


const ProductionPage = () => {
  const [data, setData] = useState<Box[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<Box | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);


  const handleRegisterMount = async (boxId: string, newMount: { user: string; quantity: number }) => {
    try {
      // Envia a atualização para o servidor
      const response = await fetch(`http://localhost:3001/boxes/${boxId}`);
      const box = await response.json();
      const updatedMountedBy = [...box.mountedBy, newMount];
      await fetch(`http://localhost:3001/boxes/${boxId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mountedBy: updatedMountedBy }),
      });
  
      // Atualiza o estado local (exemplo)
      setEditingBox((prevBox) => {
        if (!prevBox) return prevBox;
        return {
          ...prevBox,
          mountedBy: updatedMountedBy,
        };
      });
    } catch (error) {
      console.error("Erro ao registrar montagem:", error);
    }
  };
  
  
  
  
  const handleDetailsBox = async (box: Box) => {
    try {
      const response = await fetch(`http://localhost:3001/boxes/${box.id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar os detalhes da caixa");
      }
      const updatedBox = await response.json();
      setEditingBox(updatedBox); // Atualiza a caixa com os dados mais recentes
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar os detalhes da caixa:", error);
    }
  };
  
  


  const columns: ColumnDef<Box>[] = [
    {
      accessorKey: "brand",
      header: "Marca",
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
    },
    {
      accessorKey: "date",
      header: "Data (Entrada)",
    },
    {
      accessorKey: "category",
      header: "Categoria",
    },
  ];

  const fetchBoxes = async () => {
    const response = await fetch(`http://localhost:3001/boxes`);
    const boxes = await response.json();
    setData(boxes);
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const handleSaveBox = async (box: Box) => {
    try {
      const newBox = {
        ...box,
        id: Date.now().toString(), // Gera um ID único
        category: "Desmontada", // Categoria padrão
        mountedBy: box.mountedBy || [],
      };
  
      const response = editingBox
        ? await fetch(`http://localhost:3001/boxes/${editingBox.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBox),
          })
        : await fetch(`http://localhost:3001/boxes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBox),
          });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar a caixa");
      }
  
      const savedBox = await response.json();
  
      setData((prevData) => {
        if (editingBox) {
          // Atualiza a lista se for uma edição
          return prevData.map((item) => (item.id === savedBox.id ? savedBox : item));
        } else {
          // Adiciona a nova caixa no início da lista
          return [savedBox, ...prevData];
        }
      });
    } catch (error) {
      console.error("Erro ao salvar caixa:", error);
    } finally {
      setIsModalOpen(false);
      setEditingBox(null);
    }
  };
  
  
  const handleEditBox = (box: Box) => {
    setEditingBox(box);
    setIsModalOpen(true);
  };

  const handleDeleteBox = async (box: Box) => {
    try {
      const response = await fetch(`http://localhost:3001/boxes/${box.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar a caixa com ID ${box.id}');
      }
  
      setData((prevData) => prevData.filter((item) => item.id !== box.id));
    } catch (error) {
      console.error("Erro ao deletar caixa:", error);
    }
  };
  
  

  return (
    <div>
      <Button
        onClick={() => {
              setEditingBox(null); // Limpa o estado de edição
              setIsModalOpen(true); // Abre o modal para adicionar
        }} > Adicionar Demanda </Button>


      {isModalOpen && (
        <AddBoxModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBox}
          onDelete={handleDeleteBox}
          editingBox={editingBox}
        />
      )}

      {isDetailsModalOpen && editingBox && (
        <DetailsModal
          isOpen={isDetailsModalOpen} // Passa a propriedade obrigatória
          box={editingBox}
          onClose={() => setIsDetailsModalOpen(false)}
          onRegisterMount={(user, quantity) => handleRegisterMount(editingBox.id, { user, quantity })}
        />
      )}



      <DataTable
        columns={columns}
        data={data}
        filterKey="brand"
        onDelete={handleDeleteBox}
        onEdit={handleEditBox}
        onDetails={handleDetailsBox} // Passe a função handleDetailsBox
      />
    </div>
  );
};

export default ProductionPage;