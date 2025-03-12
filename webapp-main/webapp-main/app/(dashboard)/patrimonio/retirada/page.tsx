"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useNewTransaction } from "@/features/compras-e-orcamentos/transactions/hooks/use-new-transaction";
import { bulkDeleteTransactions, getTransactions } from "@/api/compras-e-orcamentos/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/compras-e-orcamentos/data-table";
import { Plus } from "lucide-react";
import { Transaction } from "@/models/compras-e-orcamentos/Transaction";

const TransacoesPage = () => {
  const newTransaction = useNewTransaction();

  const [transactions, setTransactions] = useState<Transaction>();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Retirada
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <Button onClick={newTransaction.onOpen} size={"sm"} className="w-full lg:w-auto">
              <Plus className="size-4 mr-2" />
              Retirar item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions ? transactions as unknown as Transaction[] : []}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              bulkDeleteTransactions(ids);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransacoesPage;
