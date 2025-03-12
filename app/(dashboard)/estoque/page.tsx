"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faTrashCan,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  getStorageFronts,
  insertStorageFront,
  updateStorageFrontById,
  deleteStorageFrontById,
} from "./api";
import { StorageFrontEntity } from "@/types/estoqueTypes";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/estoque/modal";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [frenteIdToDelete, setFrenteIdToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para o carregador

  // Estados para armazenar os valores dos inputs e o erro
  const [nomeFrente, setNomeFrente] = useState("");
  const [usuariosPermitidos, setUsuariosPermitidos] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingFrenteId, setEditingFrenteId] = useState<string | null>(null);

  // Lista de frentes de estoque
  const [frentes, setFrentes] = useState<StorageFrontEntity[]>([]);

  async function fetchFronts() {
    try {
      const fronts = await getStorageFronts(); // Aguarda a resposta da API
      setFrentes(fronts.data); // Atualiza o estado com os dados retornados
      setIsLoading(false); // Define como falso ao terminar de carregar
    } catch (error) {
      console.error("Erro ao buscar frentes de estoque:", error);
    }
  }

  useEffect(() => {
    fetchFronts(); // Chama a função assíncrona
  }, []);

  const handleRedirect = (id: string) => {
    router.push(`/estoque/${id}`);
  };

  const modalAddFront = () => {
    setIsModalOpen(true);
    setEditingFrenteId(null); // Resetar para adicionar uma nova frente
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalDelete = () => {
    setIsConfirmDeleteOpen(false); // Fecha o modal de confirmação
  };

  const handleCreateFrente = async () => {
    if (!nomeFrente) {
      setErrorMessage("Por favor, preencha o nome da frente.");
      return;
    }

    if (editingFrenteId) {
      const response = await updateStorageFrontById(editingFrenteId, {
        name: nomeFrente,
      });
      if (response.success) {
        setEditingFrenteId(null);
        toast.success("Frente de Estoque Editada com sucesso!", {
          position: "top-right",
          duration: 2000,
        });
        setNomeFrente("");
        setIsModalOpen(false);
        fetchFronts();
      } else {
        toast.error(response.error, {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      const response = await insertStorageFront({ name: nomeFrente });
      if (response.success) {
        setNomeFrente("");
        toast.success("Frente de Estoque Criada com sucesso!", {
          position: "top-right",
          duration: 2000,
        });
        setIsModalOpen(false);
        fetchFronts();
      } else {
        toast.error(response.error, {
          position: "top-right",
          duration: 2000,
        });
      }
    }
  };

  const handleOpenConfirmDelete = (id: string) => {
    setFrenteIdToDelete(id); // Define a frente a ser excluída
    setIsConfirmDeleteOpen(true); // Abre o modal de confirmação
  };

  const handleDeleteFrente = async () => {

      const response = await deleteStorageFrontById(frenteIdToDelete!);
      if(response.success){
        // Atualiza o estado local removendo a frente excluída
        setFrentes(frentes.filter((f) => f.id !== frenteIdToDelete));
        setFrenteIdToDelete(null);
        toast.success("Frente de Estoque Deletada com sucesso!", {
          position: "top-right",
          duration: 2000,
        });
        closeModalDelete();
      } else {
        // Fecha o modal de confirmação de exclusão
        toast.error(response.error, {
          position: "top-right",
          duration: 2000,
        });

      }


      setErrorMessage("Ocorreu um erro ao deletar a frente. Tente novamente.");

  };

  const handleEditFrente = (frente: StorageFrontEntity) => {
    setEditingFrenteId(frente.id);
    setNomeFrente(frente.name);
    // setUsuariosPermitidos(frente.usuarios) PRECISA PASSAR ISSO AQUI TAMBÉM;
    setIsModalOpen(true); // Abre o modal de edição
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-32">
      <div className="flex justify-end">
        <div className="">
          <Button
            onClick={modalAddFront}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            <FontAwesomeIcon icon={faPlus} className="me-3 size-4" /> Frente de
            Estoque
          </Button>

          <Modal
            visible={isModalOpen}
            title={
              editingFrenteId
                ? "Editar Frente de Estoque"
                : "Adicionar Frente de Estoque"
            }
            onClose={() => {
              setIsModalOpen(false);
              setNomeFrente("");
            }}
          >
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 my-6 justify-center items-center">
              <div className="w-full">
                <label className="block mb-1 text-center sm:text-left">
                  Nome da Frente de Estoque
                </label>
                <input
                  type="text"
                  placeholder="Entre com o Nome da Frente de Estoque"
                  className="border p-2 w-full"
                  value={nomeFrente}
                  onChange={(e) => setNomeFrente(e.target.value)}
                />
              </div>

              {/* <div className="w-full">
                <label className="block mb-1 text-center sm:text-left">
                  Usuários Permitidos
                </label>
                <input
                  type="text"
                  placeholder="Escolha os Usuários Permitidos"
                  className="border p-2 w-full"
                  value={usuariosPermitidos}
                  onChange={(e) => setUsuariosPermitidos(e.target.value)}
                />
              </div> */}
            </div>

            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => handleCreateFrente()}
              >
                Salvar Alterações
              </Button>
            </div>
          </Modal>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl lg:text-4xl text-white font-bold">
          Selecione uma Frente de Estoque
        </h1>
      </div>

    
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-[29px] justify-center">
          {frentes?.map((frente) => (
            <div
              key={frente.id}
              className="w-4/5 border cursor-pointer border-black bg-white h-[45px] rounded flex items-center mx-auto px-5 py-2"
              onClick={() => handleRedirect(frente.id)}
            >
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="w-7 h-7 text-gray-700"
              />
              <span className="ml-3">{frente.name}</span>

              <div className="flex items-center ml-auto">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="mr-2 w-6 h-6 cursor-pointer text-yellow-500 text-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditFrente(frente);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="cursor-pointer w-6 h-6 text-red-500 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenConfirmDelete(frente.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {isConfirmDeleteOpen && (
        <Modal
          visible={isConfirmDeleteOpen}
          title="Confirme sua Ação"
          onClose={() => setIsConfirmDeleteOpen(false)}
        >
          <div className="my-5">
            <p className="text-lg">
              Tem certeza que deseja excluir esta frente de estoque?
            </p>
            <p className="text-md text-gray-400 ">
              Isso deletará todos os produtos e categorias presentes
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300 me-3"
              onClick={() => closeModalDelete()}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
              onClick={() => handleDeleteFrente()}
            >
              Excluir Frente
            </Button>
          </div>
        </Modal>
      )}
      <Toaster />
    </div>
  );
}
