"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBox,
  faFolderPlus,
  faBook,
  faPlus,
  faPenToSquare,
  faTrashCan,
  faEllipsisVertical,
  faAppleWhole,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  deleteCategoryById,
  getCategories,
  getMeasurementUnits,
  getProducts,
  getStorageFrontById,
  insertCategory,
  updateCategoryById,
  insertProduct,
  deleteProductById,
  updateProductById,
  uploadImage,
} from "../api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { string } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/estoque/modal";
import { CardProduct } from "@/components/estoque/cardProduct";
import { CategoryEntity, CreateProductRequest } from "@/types/estoqueTypes";
import { toast, Toaster } from "sonner";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [refetch, setRefetch] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);
  const [refetchSelect, setRefetchSelect] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState(false);
  const [frontName, setFrontName] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [categoriesSelect, setCategoriesSelect] = useState<any[]>([]);
  const [visibleConfirmCategory, setVisibleConfirmCategory] =
    useState<boolean>(false);
  const [deletedCategory, setDeletedCategory] = useState<CategoryEntity>({
    id: "",
    storageFrontId: 0,
    name: "",
  });
  //form category
  const [nameCategory, setNameCategory] = useState<string>("");
  //form product
  const [nameProduct, setNameProduct] = useState<string>("");
  const [observationProduct, setObservationProduct] = useState<string>("");
  const [minQuantityProduct, setMinQuantityProduct] = useState<number>(0);
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [selectedUnity, setSelectedUnity] = useState<string>("");
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editCategoryVisible, setEditCategoryVisible] =
    useState<boolean>(false);
  const [selectedCategoryToEdit, setSelectedCategoryToEdit] =
    useState<CategoryEntity | null>(null);

  const [unitySelect, setUnitySelect] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adiciona estado de loading

  const handleEditCategory = (category: CategoryEntity) => {
    setSelectedCategoryToEdit(category); // Defina a categoria selecionada
    setEditCategoryVisible(true); // Mostre a modal de edição
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const fetchProductsAndCategories = async () => {
    const categories = await getCategories();
    // Filtrar as categorias com base no storageFrontId
    const filteredCategories = categories.data.filter(
      (category) => category.storageFrontId === parseFloat(params.id)
    );

    return filteredCategories;
  };

  const resetFormProduct = () => {
    setNameProduct("");
    setObservationProduct("");
    setMinQuantityProduct(0);
    setQuantityProduct(0);
    setSelectedUnity("");
    setSelectedCategory("");
  };

  const handleCreateCategory = async (name: string) => {
    const response = await insertCategory({
      name: name,
      storageFrontId: parseFloat(params.id),
    });
    if (response.success) {
      setRefetch(true);
      setRefetchSelect(true);
      setCategoryVisible(false);
      setNameCategory("");
      setSelectedValue("");
      toast.success("Categoria Criada com sucesso!", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error(response.error, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleUpdateCategory = async (category: CategoryEntity | null) => {
    if (category) {
      const response = await updateCategoryById(category.id, {
        name: category.name,
        storageFrontId: category.storageFrontId,
      });

      if (response.success) {
        setRefetch(true); // Atualiza a lista de categorias
        setRefetchSelect(true);
        setEditCategoryVisible(false); // Fecha a modal
        toast.success("Categoria Editada com sucesso!", {
          position: "top-right",
          duration: 2000,
        });
      } else {
        toast.error(response.error, {
          position: "top-right",
          duration: 2000,
        });
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteCategoryById(id);
      console.log(response);
      setDeletedCategory({
        id: "",
        storageFrontId: 0,
        name: "",
      });
      setVisibleConfirmCategory(false);
      setRefetch(true);
      setRefetchSelect(true);
      toast.success("Categoria Deletada com sucesso!", {
        position: "top-right",
        duration: 2000,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao deletar categoria", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleCreateProduct = async () => {
    console.log("image", image);
    const imagePath = await uploadImage({ file: image });
    const response = await insertProduct({
      name: nameProduct,
      measureUnitId: selectedUnity,
      categoryId: selectedCategory,
      quantity: quantityProduct,
      minQuantity: minQuantityProduct,
      observation: observationProduct,
      imagePath: imagePath.path,
      // createdByUserId: "",
    });
    if (response.success) {
      console.log(response);
      setNameCategory("");
      setSelectedValue("");
      setRefetch(true);
      resetFormProduct();
      setProductVisible(false);
      toast.success("Produto Criado com sucesso!", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error(response.error, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      console.log("Imagem selecionada:", selectedFile);
      setImage(selectedFile); // Atualiza o estado com o arquivo selecionado
    }
  };

  useEffect(() => {
    if (refetch) {
      const loadCategories = async () => {
        const categorizedProducts = await fetchProductsAndCategories();
        setCategories(categorizedProducts);
      };

      const loadFrontStorage = async () => {
        const frontStorage = await getStorageFrontById(params.id);
        setFrontName(frontStorage.data.name);
      };

      loadFrontStorage();
      loadCategories();
      setRefetch(false);
      setRefetchSelect(false);
    }
  }, [params.id, refetch]);

  useEffect(() => {
    if (selectedValue) {
      if (selectedValue === "new_category") {
        setCategoryVisible(true);
      }
      if (selectedValue === "new_product") {
        setProductVisible(true);
      }
    }
  }, [selectedValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Ativa o estado de loading

        // Carrega categorias
        const categories = await getCategories();
        const filteredCategories = categories.data.filter(
          (category) => category.storageFrontId === parseFloat(params.id)
        );
        setCategoriesSelect(filteredCategories);

        // Carrega unidades de medida
        const unities = await getMeasurementUnits();
        setUnitySelect(unities.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false); // Desativa o estado de loading após completar
      }
    };

    fetchData();
  }, [refetchSelect]);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-36">
      <div className="w-11/12 mx-auto flex items-center">
        <div className="flex-1 text-start">
          <h1 className="text-3xl lg:text-3xl text-white font-bold">
            {frontName}
          </h1>
        </div>
        <div className="w-1/4 px-2">
          <Input placeholder="Buscar" />
        </div>
        <div className="w-1/4 px-2">
          <Select
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Opções" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="new_product">
                  <FontAwesomeIcon icon={faBox} className="mr-2" />
                  Novo Produto
                </SelectItem>
                <SelectItem value="new_category">
                  <FontAwesomeIcon icon={faFolderPlus} className="mr-2" />
                  Nova Categoria
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading && categories.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
          <p className="text-lg font-bold">Carregando categorias...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="w-full text-center  text-black-500 flex flex-col items-center mt-32">
  <p>Não há categorias disponíveis no momento.</p>
  
  <Button
    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center mt-4"
    onClick={() => setCategoryVisible(true)}
  >
    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Adicionar
  </Button>
</div>
      ) : (
        categories.map((category) => (
          <>
            <div className="w-11/12 mx-auto mt-8">
              <div className="bg-white h-14 w-full rounded flex align-middle py-3.5 border border-black">
                <div className="w-7 h-full ms-4">
                  {/* <Checkbox
                       checked={isChecked}
                       onCheckedChange={handleCheckboxChange}
                       className="w-full h-full"
                       id="my-checkbox"
                     /> */}
                </div>
                <div className="ms-5 w-2/5 font-bold">
                  <h2 className="flex">
                    <FontAwesomeIcon icon={faBook} className="me-3 size-6" />
                    {category.name}
                  </h2>
                </div>
                <div className="ms-5 w-3/5 font-bold flex justify-end">
                  <h2
                    className="text-green-500 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setProductVisible(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-3 size-6" />
                  </h2>
                  <h2
                    className="text-yellow-400 cursor-pointer"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="me-3 size-6"
                    />
                  </h2>

                  <h2
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => {
                      setDeletedCategory(category);
                      setVisibleConfirmCategory(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="me-3 size-6"
                    />
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-11/12 flex mx-auto mt-5 gap-5">
  {category?.products?.length ? (
    category.products.map((product: any) => (
      <div className="w-1/6" key={product.id}>
        <CardProduct
          product={product}
          setRefetch={setRefetch} // Passando o setter de refetch
          onDelete={() => setRefetch(true)} // Chamando ao deletar
          onUpdate={() => setRefetch(true)} // Chamando ao atualizar
          params={params} // Passe os params para o CardProduct
        />
      </div>
    ))
  ) : (
    <div className="w-full text-center mt-10 text-gray-500">
      Não há produtos disponíveis no momento.
    </div>
  )}
</div>

          </>
        ))
      )}

      <Modal
        visible={categoryVisible}
        title="Nova Categoria"
        onClose={() => {
          setCategoryVisible(false);
          setSelectedValue("");
        }}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 justify-center items-center">
          <div className="w-full">
            <label className="block mb-1 sm:text-left">Nome da Categoria</label>
            <Input
              placeholder="Entre com o Nome da Frente de Estoque"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
              className="border border-black p-2 w-full mt-2"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="flex justify-end gap-x-3">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300"
            onClick={() => {
              setCategoryVisible(false);
              setSelectedValue("");
            }}
          >
            Cancelar
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-7 py-5 rounded-lg"
            onClick={() => handleCreateCategory(nameCategory)}
          >
            Criar
          </Button>
        </div>
      </Modal>

      <Modal
        visible={productVisible}
        onClose={() => setProductVisible(false)}
        title="Novo produto"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="block mb-1 sm:text-left">Nome do Produto</label>
            <Input
              placeholder="Entre com o Nome do Produto"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>
          <div className="col-6 pt-1">
            <label className="block mb-1 sm:text-left">Categoria</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoriesSelect?.map((c) => {
                    return <SelectItem value={c.id}>{c.name}</SelectItem>;
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-6 pt-1">
            <label className="block mb-1 sm:text-left">Unidade de Medida</label>
            <Select onValueChange={(value) => setSelectedUnity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Unidade de Medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {unitySelect?.map((p) => {
                    return <SelectItem value={p.id}>{p.name}</SelectItem>;
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-6">
            <label className="block mb-1 sm:text-left">Quantidade Mínima</label>
            <Input
              placeholder="Entre com a Quantidade Mínima"
              value={minQuantityProduct}
              type="number"
              onChange={(e) =>
                setMinQuantityProduct(parseFloat(e.target.value))
              }
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>
          <div className="col-6">
            <label className="block mb-1 sm:text-left">
              Quantidade Inicial
            </label>
            <Input
              placeholder="Entre com a Quantidade Inicial do Produto"
              value={quantityProduct}
              type="number"
              onChange={(e) => setQuantityProduct(parseFloat(e.target.value))}
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>
          <div className="col-span-full">
            <label className="block mb-1 sm:text-left">Observação</label>
            <Textarea
              placeholder="Escreva uma observação sobre o produto"
              value={observationProduct}
              onChange={(e) => setObservationProduct(e.target.value)}
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Imagem do Produto
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:text-sm file:text-gray-700 hover:file:bg-gray-100 focus:file:outline-none focus:file:ring-2 focus:file:ring-blue-500 file:cursor-pointer file:transition-all"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="flex justify-end gap-x-3 mt-3">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300"
            onClick={() => setProductVisible(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-7 py-5 rounded-lg"
            onClick={() => handleCreateProduct()}
          >
            Criar
          </Button>
        </div>
      </Modal>

      <Modal
        visible={visibleConfirmCategory}
        title="Confirme sua Ação"
        onClose={() => setVisibleConfirmCategory(false)}
      >
        <div className="my-5">
          <p className="text-lg">
            Tem certeza que deseja excluir permanentemente a categoria{" "}
            <strong>{deletedCategory.name}</strong>?
          </p>
          <p className="text-md text-gray-400 ">
            Isso deletará também todos os produtos presentes nessa categoria
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300 me-3"
            onClick={() => setVisibleConfirmCategory(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => handleDeleteCategory(deletedCategory.id)}
          >
            Excluir Categoria
          </Button>
        </div>
      </Modal>

      <Modal
        visible={editCategoryVisible}
        title="Editar Categoria"
        onClose={() => setEditCategoryVisible(false)}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 justify-center items-center">
          <div className="w-full">
            <label className="block mb-1 sm:text-left">Nome da Categoria</label>
            <Input
              placeholder="Editar Nome da Categoria"
              value={selectedCategoryToEdit?.name || ""}
              onChange={(e) =>
                setSelectedCategoryToEdit(
                  (prev) => prev && { ...prev, name: e.target.value }
                )
              }
              className="border border-black p-2 w-full mt-2"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="flex justify-end gap-x-3">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300"
            onClick={() => setEditCategoryVisible(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-7 py-5 rounded-lg"
            onClick={() => handleUpdateCategory(selectedCategoryToEdit)}
          >
            Salvar
          </Button>
        </div>
      </Modal>

      <Toaster />
    </div>
  );
}
