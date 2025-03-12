"use client";

import { ColumnDef, Row } from "@tanstack/react-table";


import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/compras-e-orcamentos/data-table";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Actions from "../../compras-e-orcamentos/transactions/actions";

type ResponseType = {
  id: string;
  name: string;
  quantity: number;
  phone: string;
};

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome do Responsavel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Qtde. Integrantes",
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => row.original.phone,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];

export default function DashboardPage() {
  type Families = {
    title: string;
    quantity: number;
    phone: string;
  };

  const families: Families[] = [
    {
      title: "Diego",
      quantity: 3,
      phone: "(16) 99955-3345",
    },
    {
      title: "Luis Felipe Mozer Chiqueto",
      quantity: 4,
      phone: "(16) 99968-3254",
    },
  ];

  const isDisabled = false;

  const mappedFamilies = families.map((family, index) => ({
    id: String(index + 1), // Gerar um `id` baseado no índice
    name: family.title, // Mapeando `title` para `name`
    quantity: family.quantity, // Mapeando a quantidade de integrantes
    phone: family.phone, // Mapeando o telefone
  }));

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        {/* Title section with background and rounded borders */}
        <div className="flex flex-col space-y-1.5 p-6 gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl font-bold">
            Famílias Beneficiárias
          </CardTitle>
          <Button size={"sm"}>
            <Plus className="size-4 mr-2" />
            Adicionar novo
          </Button>
        </div>

        {/* Data Table */}
        <CardContent>
          <DataTable
            columns={columns}
            data={mappedFamilies}
            filterKey="title"
            disabled={isDisabled}
            onDelete={(rows) => {
              console.log("Deleted rows:", rows);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
