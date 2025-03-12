"use client";

import * as React from "react";
import {
  Row,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import UseConfirm from "@/hooks/use-confirm";
import { Cartonagem } from "@/models/producao-de-caixas/Cartonagem";

// Definição das props para o DataTable específico das Cartonagens
interface DataTableCartonagensProps {
  data: Cartonagem[];
  onDelete: (cartonagem: Cartonagem) => void; // Callback para deletar uma cartonagem
  onEdit: (cartonagem: Cartonagem) => void; // Callback para editar uma cartonagem
}



export const DataTableCartonagens: React.FC<DataTableCartonagensProps> = ({
  data,
  onDelete,
  onEdit,
}) => {
  const [ConfirmDialog, confirm] = UseConfirm(
    "Você tem certeza?",
    "Essa ação não poderá ser desfeita."
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // Configurando as colunas específicas para Cartonagens
  const columns: ColumnDef<Cartonagem>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "telephone",
      header: "Telefone",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(row.original)}
            variant="default"
            size="sm"
          >
            Editar
          </Button>
          <Button
            onClick={async () => {
              const confirmed = await confirm();
              if (confirmed) onDelete(row.original);
            }}
            variant="destructive"
            size="sm"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <ConfirmDialog />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div>
          <span className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="outline"
          >
            Anterior
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
};
