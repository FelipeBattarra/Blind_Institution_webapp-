/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/compras-e-orcamentos/data-table";
import { columns } from "./columns";
import { useNewCategory } from "@/features/compras-e-orcamentos/categories/hooks/use-new-category";
import { useCallback, useEffect, useState } from "react";
import { bulkDeleteCategories, getCategories } from "@/api/compras-e-orcamentos/categories";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBudgets } from "@/api/compras-e-orcamentos/budgets";
import { Budgets } from "@/models/compras-e-orcamentos/Budgets";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<Budgets[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBudgets();
      setBudgets(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Erro ao buscar solicitações de compra");
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const newCategory = useNewCategory();

  // Configura o callback para atualizar categorias após fechamento
  useEffect(() => {
    newCategory.setOnAfterClose(fetchBudgets);
  }, [fetchBudgets]); // Remova newCategory daqui para evitar loops

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Solictações de Compra</CardTitle>
          <Button onClick={newCategory.onOpen} size={"sm"}>
            <Plus className="size-4 mr-2" />
            Adicionar novo
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={budgets}
            filterKey="category_name"
            onDelete={async (row) => {
              const ids = row.map((r) => r.original.id);
              await bulkDeleteCategories(ids);
              fetchBudgets(); // Fetch categories again after deletion
            }}
          />
        </CardContent>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
};

export default BudgetsPage;
