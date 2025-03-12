import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UseConfirm from "@/hooks/use-confirm";
import CategoryForm from "./category-form";
import { useOpenCategory } from "../hooks/use-open-category";
import { useEffect, useState } from "react";
import { deleteCategorie, getCategories, updateCategorie } from "@/api/compras-e-orcamentos/categories";
import { Categorie } from "@/models/compras-e-orcamentos/Categorie";
import React from "react";

const insertCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  maximumBudget: z.number()
});

const formSchema = insertCategorySchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [categorie, setCategorie] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const formattedData = response.data.map((item) => ({
          ...item,
          maximumBudget: parseFloat(item.maximumBudget.toString()),
        }));
        setCategorie(formattedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [ConfirmDialog, confirm] = UseConfirm(
    "Você tem certeza?",
    "Você irá deletar essa categoria permanentemente"
  )

  const onSubmit = (values: FormValues) => {
    if (id) {
      updateCategorie(id, values).then(() => {
        onClose();
      });
    } else {
      console.error("Category ID is undefined");
    }
  };

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      if (id) {
        deleteCategorie(id).then(() => {
        })
      } onClose()
    }
  }

  const selectedCategory = categorie.find(cat => cat.id === id);

  const defaultValues = selectedCategory
    ? {
      name: selectedCategory.name,
      maximumBudget: selectedCategory.maximumBudget
    }
    : {
      name: "",
      maximumBudget: 0
    };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar categoria</SheetTitle>
            <SheetDescription>
              Edite uma categoria existente, para organizar suas transações
            </SheetDescription>
          </SheetHeader>

          <CategoryForm
            id={id}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            onDelete={onDelete}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
