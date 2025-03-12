import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CategoryForm from "./-form";
import { useNewCategory } from "../hooks/use-new-category";
import { createCategorie } from "@/api/compras-e-orcamentos/categories";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const insertCategorySchema = z.object({
  id: z.number(),
  name: z
    .string({ message: "Nome da categoria é obrigatório" })
    .min(3, "Nome da categoria deve ter no mínimo 3 caracteres.")
    .max(120, "Nome da categoria deve ter no máximo 120 caracteres."),
  maximumBudget: z
    .number({ message: "Limite máximo de gasto é obrigatório" })
    .positive("Limite máximo de gasto deve ser um número positivo."),
});

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()

  const onSubmit = async (values: FormValues) => {
    try {
      await createCategorie(values);
      onClose(); // Feche o modal e dispare o callback de atualização
    } catch {
      toast.error("Erro ao criar categoria");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova categoria</SheetTitle>
          <SheetDescription>
            Adicione uma nova categoria para organizar suas transações
          </SheetDescription>
        </SheetHeader>

        <CategoryForm onSubmit={onSubmit} defaultValues={{ name: "", maximumBudget: 0 }} />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
