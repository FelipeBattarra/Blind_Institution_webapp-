import {
  faAppleWhole,
  faEllipsisVertical,
  faEdit,
  faTrashCan,
  faBoxArchive,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, Toaster } from "sonner";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Modal } from "@/components/estoque/modal";
import { Button } from "@/components/ui/button";
import { ProductEntity, UpdateProductRequest } from "@/types/estoqueTypes";
import {
  deleteProductById,
  movimentProduct,
  updateProductById,
  getCategories,
  getMeasurementUnits,
  fetchImage,
  uploadImage,
} from "@/app/(dashboard)/estoque/api";
interface cardProps {
  product: ProductEntity,
  setRefetch: (refetch: boolean) => void; // Função que altera o estado de refetch
  onDelete: () => void;
  onUpdate: () => void;
  params: { id: string }; // Inclua os params no tipo do CardProduct
}

export const CardProduct: React.FC<cardProps> = ({
  product,
  setRefetch,
  onDelete,
  onUpdate,
  params,
}) => {
  const [visibleConfirmProduct, setVisibleConfirmProduct] =
    useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [visibleConfirmEditProduct, setVisibleConfirmEditProduct] =
    useState<boolean>(false);
  const [visibleBaixa, setVisibleBaixa] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [deletedProduct, setDeletedProduct] = useState<ProductEntity>({
    id: "",
    name: "",
    quantity: 0,
    image_path: "",
    created_by_user_id: "",
  });
  const [editedProduct, setEditedProduct] = useState<ProductEntity>(product); // Estado para o produto editado
  const [refetchSelect, setRefetchSelect] = useState<boolean>(true);

  const [selectedProductToEdit, setSelectedProductToEdit] =
    useState<ProductEntity | null>(null);
  const [quantidade, setQuantidade] = useState<number>(-1); // Estado do tipo number

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categoriesSelect, setCategoriesSelect] = useState<any[]>([]);
  //form product
  const [nameProduct, setNameProduct] = useState<string>("");
  const [observationProduct, setObservationProduct] = useState<string>("");
  const [minQuantityProduct, setMinQuantityProduct] = useState<number>(0);
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [selectedUnity, setSelectedUnity] = useState<string>("");
  const [productVisible, setProductVisible] = useState<boolean>(false);

  const [editCategoryVisible, setEditCategoryVisible] =
    useState<boolean>(false);

  const [unitySelect, setUnitySelect] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adiciona estado de loading

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProductById(id);
      console.log(response);
      setDeletedProduct({
        id: "",
        name: "",
        quantity: 0,
        image_path: "",
        created_by_user_id: "",
      });
      setRefetch(true); // Notifica a página principal para recarregar
      setVisibleConfirmProduct(false); // Fecha o modal
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      toast.error("Erro em deletar o produto");
    }
  };

  const handleUpdateProduct = async () => {
    console.log("unidade", selectedUnity);
    console.log("Quantidade informada:", quantidade);
    console.log("Quantidade atual do produto:", editedProduct.quantity);
    console.log("unidade de medida", editedProduct.measurement_unit_id);
    console.log("categoria", editedProduct.category_id);
    console.log("min quantidade", editedProduct.min_quantity);
    console.log("obs", editedProduct.observation);
    //ver do objeto
    let imgPath = "";
    if(isImageChanged){
      const imagePath = await uploadImage({ file: image });
      imgPath = imagePath.path;
    } else {
      imgPath = editedProduct?.image_path;
    }
    
    const data = {
      measureUnitId: selectedUnity,
      categoryId: selectedCategory,
      observation: observationProduct,
      minQuantity: minQuantityProduct,
      imagePath: imgPath,
      ...(nameProduct !== product.name && { name: nameProduct })
    };
    setEditedProduct({
      id: product.id,
      created_by_user_id: product.created_by_user_id,
      min_quantity: minQuantityProduct,
      measurement_unit_id: selectedUnity,
      category_id: selectedCategory,
      observation: observationProduct,
      image_path: imgPath,
      name: nameProduct !== product.name ? nameProduct : product.name,
    }); // Atualiza o produto que será editado
    const response = await updateProductById(editedProduct.id, data);
    console.log(response);
    if (response.success) {
      setRefetch(true);
      setVisibleConfirmEditProduct(false);
      setImage(null);
      toast.success("Produto Editado com sucesso!", {
        position: "top-right",
        duration: 2000,
      });
      // window.location.reload();
    } else {
      toast.error(response.error, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleBaixar = async () => {
    console.log("unidade", selectedUnity);
    console.log("Quantidade informada:", quantidade);
    console.log("Quantidade atual do produto:", editedProduct.quantity);
    console.log("unidade de medida", editedProduct.measurement_unit_id);

    // Garante que `editedProduct.quantity` tenha um valor padrão
    const currentQuantity = editedProduct.quantity ?? 0;

    // Verifica se não há quantidade disponível
    if (currentQuantity === 0) {
      toast.error("Não há mais estoque para dar baixa.");
      return;
    }

    // Verifica se a quantidade solicitada para baixar é válida (não pode ser positiva)
    if (quantidade >= 0) {
      toast.error("Quantidade inválida. Deve ser negativa ou zero.");
      return;
    }

    // Calcula a nova quantidade após a baixa
    const novaQuantidade = currentQuantity + quantidade; // quantidade é negativa, somar é subtrair
    if (novaQuantidade < 0) {
      toast.error("Quantidade para baixa excede o estoque disponível.");
      return;
    }

    try {
      // Chamada com apenas id e quantidade
      const response = await movimentProduct(editedProduct.id, quantidade);

      if (response.success) {
        setEditedProduct((prev) => ({
          ...prev,
          quantity: novaQuantidade, // Atualiza com a nova quantidade calculada
        }));
        setRefetch(true);
        setVisibleConfirmProduct(false);
        toast.success("Baixa concluída com sucesso");
      } else {
        toast.error(response.error, {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer baixa:", error);
      toast.error("Erro de conexão com o servidor.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setIsImageChanged(true);
      // console.log("Imagem selecionada:", selectedFile);
      setImage(selectedFile); // Atualiza o estado com o arquivo selecionado
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      const filteredCategories = categories.data.filter(
        (category) => category.storageFrontId === parseFloat(params.id)
      );
      setCategoriesSelect(filteredCategories);
    };
  }, [refetchSelect]);

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

  //setando os valores
  useEffect(() => {
    async function handleFetchImage() {
      if (editedProduct?.image_path) {
        try {
          const file = await fetchImage(editedProduct.image_path);
          if (file) {
            setImage(file);
            // console.log("Imagem carregada como arquivo:", file);
          }
        } catch (error) {
          // console.error("Erro ao carregar a imagem como arquivo:", error);
        }
      }
    }

    if (editedProduct && visibleConfirmEditProduct) {
      // console.log("Produto", editedProduct);
      console.log(product);
      console.log("e", editedProduct);
      setNameProduct(product.name || "");
      setSelectedUnity(product.measurement_unit_id || "");
      setSelectedCategory(product.category_id || "");
      setMinQuantityProduct(product.min_quantity || 0);
      setObservationProduct(product.observation || "");

      handleFetchImage();
    }
  }, [editedProduct, visibleConfirmEditProduct]);

  return (
    <div className="w-full border border-black h-24 rounded relative">
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between">
          <div>
            <h2 className="ms-3 mt-1 size-5">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="w-5 h-5 cursor-pointer"
                onClick={() => setListVisible((prev) => !prev)}
              />
            </h2>
            {listVisible && (
              <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-md z-10">
                <ul>
                  <li
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setVisibleConfirmEditProduct(true);
                      setListVisible(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Editar
                  </li>
                  <li
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setVisibleBaixa(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
                    Baixar Estoque
                  </li>
                  <li
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setDeletedProduct({
                        ...product,
                        created_by_user_id: "",
                      });
                      setVisibleConfirmProduct(true);
                      setListVisible(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                    Excluir Produto
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="bg-black py-1 px-2 rounded-bl-lg ">
            <h4 className="text-white">{product.quantity}</h4>
          </div>
        </div>
        <div className="mb-3">
          <h2 className="flex ms-3 mt-1 size-5 w-full">
            <FontAwesomeIcon icon={faAppleWhole} className="me-3 w-5 h-5" />
            {product.name}
          </h2>
        </div>
      </div>

      <Modal
        visible={visibleBaixa}
        title="Confirme sua Ação"
        onClose={() => setVisibleBaixa(false)}
      >
        <div className="my-5">
          <p className="text-lg">Quantidade: {editedProduct.quantity}</p>
          <p className="text-lg">Unidade de Medida: {product.measurement_unit_id}</p>
          <p className="text-lg"></p>

          {/* Campo de entrada para a quantidade */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Quantidade:
            </label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => {
                const valor = Number(e.target.value);
                if (valor <= 0) {
                  // Aceita valores negativos ou zero
                  setQuantidade(valor);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Digite a quantidade negativa"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300 me-3"
            onClick={() => setVisibleBaixa(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => handleBaixar()}
          >
            Baixar
          </Button>
        </div>
      </Modal>

      <Modal
        visible={visibleConfirmProduct}
        title="Confirme sua Ação"
        onClose={() => setVisibleConfirmProduct(false)}
      >
        <div className="my-5">
          <p className="text-lg">
            Tem certeza que deseja excluir permanentemente o produto{" "}
            <strong>{deletedProduct.name}</strong>?
          </p>
          <p className="text-md text-gray-400 ">
            Isso deletará todos os produtos presentes
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300 me-3"
            onClick={() => setVisibleConfirmProduct(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => handleDeleteProduct(deletedProduct.id)}
          >
            Excluir Produto
          </Button>
        </div>
      </Modal>

      <Modal
        visible={visibleConfirmEditProduct}
        title="Editar Produto"
        onClose={() => setVisibleConfirmEditProduct(false)}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Nome do Produto */}
          <div className="col-span-full">
            <label className="block mb-1 sm:text-left">Nome do Produto</label>
            <Input
              placeholder="Entre com o Nome do Produto"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>

          {/* Categoria */}
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
                  {categoriesSelect?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Unidade de Medida */}
          <div className="col-6 pt-1">
            <label className="block mb-1 sm:text-left">Unidade de Medida</label>
            <Select
              value={selectedUnity}
              onValueChange={(value) => setSelectedUnity(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Unidade de Medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {unitySelect?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Quantidade Mínima */}
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

          {/* Observação */}
          <div className="col-span-full">
            <label className="block mb-1 sm:text-left">Observação</label>
            <Textarea
              placeholder="Escreva uma observação sobre o produto"
              value={observationProduct}
              onChange={(e) => setObservationProduct(e.target.value)}
              className="border border-gray-200 p-2 w-full mt-2"
            />
          </div>
          <div className="col-span-full">
          <label className="block mb-1 sm:text-left">Imagem</label>
            {image ? (
              <div className="relative w-full">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Imagem do Produto"
                  className="w-full h-auto rounded-lg border border-gray-300 max-h-40"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 px-3 bg-red-500 text-white p-2 rounded-full focus:outline-none"
                >
                  <FontAwesomeIcon icon={faX}/>
                </button>
              </div>
            ) : (
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:text-sm file:text-gray-700 hover:file:bg-gray-100 focus:file:outline-none focus:file:ring-2 focus:file:ring-blue-500 file:cursor-pointer file:transition-all"
              />
            )}
          </div>
        </div>

        {/* Mensagem de erro */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Botões */}
        <div className="flex justify-end gap-x-3 mt-3">
          <Button
            className="bg-transparent text-black border border-gray-300 px-7 py-5 rounded-lg hover:bg-gray-300"
            onClick={() => setVisibleConfirmEditProduct(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-7 py-5 rounded-lg"
            onClick={() => handleUpdateProduct()}
          >
            Editar
          </Button>
        </div>
      </Modal>
    </div>
  );
};
