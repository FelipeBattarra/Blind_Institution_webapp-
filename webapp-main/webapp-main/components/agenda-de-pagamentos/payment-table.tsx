import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "../compras-e-orcamentos/data-table";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { formatDate } from "./utils";

export const badges = {
  "1": {
    variant: "default",
    className: "bg-yellow-500 text-white",
    text: "Pendente",
  },
  "2": {
    variant: "default",
    className: "bg-blue-500 text-white",
    text: "Aprovado",
  },
  "3": {
    variant: "default",
    className: "bg-red-500 text-white",
    text: "Reprovado",
  },
  "4": {
    variant: "default",
    className: "bg-green-500 text-white",
    text: "Pago",
  },
  "5": {
    variant: "default",
    className: "bg-gray-500 text-white",
    text: "Cancelado",
  },
};

const defaultAddPaymentForm = {
  title: "",
  value: "",
  due_date: "",
  supplier_id: "",
};

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "creation_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Criação
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return formatDate(row.original.creation_date);
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Vencimento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return formatDate(row.original.due_date);
    },
  },
  {
    accessorKey: "payment_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pagamento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return formatDate(row.original.payment_date);
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Título
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <span>R$ {row.original.value.toFixed(2).replace(".", ",")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const badge = badges[row.original.status] ?? {
        variant: "default",
        className: "bg-gray-500 text-white",
        text: row.original.status,
      };
      return (
        <Badge variant={badge.variant} className={badge.className}>
          {badge.text}
        </Badge>
      );
    },
  },
];

const DropdownDivider = () => <hr className="my-1 border-gray-200" />;

export function PaymentTable({
  loading,
  data,
  setViewPayment,
  setPaymentFiles,
  setEditPayment,
  removePayment,
  bulkDeletePayments,
  changePaymentStatus,
}: any) {
  return (
    <DataTable
      loading={loading}
      columns={[
        ...columns,
        {
          id: "actions",
          header: "Opções",
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Opções
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setViewPayment(row.original)}>
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPaymentFiles(row.original.id)}
                >
                  Arquivos
                </DropdownMenuItem>
                {/* Apenas um pagamento pendente pode ser editado */}
                {row.original.status === 1 && (
                  <DropdownMenuItem
                    onClick={() => setEditPayment(row.original)}
                  >
                    Editar
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => removePayment(row.original.id)}
                >
                  Deletar
                </DropdownMenuItem>
                <DropdownDivider />
                {row.original.status === 1 && (
                  <>
                    <DropdownMenuItem
                      className="text-blue-500"
                      onClick={() =>
                        changePaymentStatus(row.original.id, "approve")
                      }
                    >
                      Aprovar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() =>
                        changePaymentStatus(row.original.id, "reject")
                      }
                    >
                      Reprovar
                    </DropdownMenuItem>
                  </>
                )}
                {row.original.status === 2 && (
                  <DropdownMenuItem
                    className="text-green-500"
                    onClick={() => changePaymentStatus(row.original.id, "pay")}
                  >
                    Pagar
                  </DropdownMenuItem>
                )}
                {row.original.status === 2 && (
                  <DropdownMenuItem
                    className="text-gray-500"
                    onClick={() =>
                      changePaymentStatus(row.original.id, "cancel")
                    }
                  >
                    Cancelar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]}
      data={data}
      filterKey="title"
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);
        bulkDeletePayments(ids);
      }}
    />
  );
}
