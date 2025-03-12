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
} from "@/components/ui/table"; // Certifique-se de que esse caminho está correto

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import UseConfirm from "@/hooks/use-confirm";

// Adicione a interface para as props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  onDelete: (box: TData) => void; // Modificado para uma única caixa
  onEdit: (row: TData) => void;
  disabled?: boolean;
}


// Adicione um novo botão para editar
export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  onEdit,
  onDetails, // Adicione a função de detalhes
  disabled,
}: DataTableProps<TData, TValue> & { onDetails: (row: TData) => void }) {
  const [ConfirmDialog, confirm] = UseConfirm(
    "Você tem certeza?",
    "Você não poderá desfazer essa ação."
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <ConfirmDialog />
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filtrar por ${
            filterKey === "payee" ? "descrição" : "nome"
          }`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
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
                  <TableCell>
                    {/* Botão "Detalhes" */}
                    <Button
                      onClick={() => onDetails(row.original)}
                      variant="default"
                      size="sm"
                      className="ml-2"
                    >
                      Detalhes
                    </Button>

  
                    {/* Botão "Editar" */}
                    <Button
                      onClick={() => onEdit(row.original)}
                      variant="default"
                      size="sm"
                      className="ml-2"
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
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
  
}
