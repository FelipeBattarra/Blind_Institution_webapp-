import {
  addPayment,
  approvePayment,
  cancelPayment,
  deleteFile,
  deletePayment,
  downloadFileURL,
  editPayment,
  getNewPaymentData,
  getPayments,
  listFiles,
  payPayment,
  rejectPayment,
  uploadFile,
} from "@/api/agenda-de-pagamentos/payments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaDownload, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input, Select } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { PaymentTable } from "./payment-table";
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

function AddPaymentModal({ loadPayments }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    suppliers: [],
  });

  const [formValues, setFormValues] = useState(defaultAddPaymentForm);

  useEffect(() => {
    async function fetchData() {
      const data = await getNewPaymentData();
      setData(data);
    }

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addPayment(formValues);
      setIsOpen(false);
    } catch (error) {
      toast.error("Erro ao adicionar pagamento.");
    }
    loadPayments();
    setFormValues(defaultAddPaymentForm);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <FaPlus className="size-4 mr-2" />
          Adicionar Pagamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Pagamento</DialogTitle>
        </DialogHeader>

        <Label>Nome</Label>
        <Input
          type="text"
          name="title"
          placeholder="Título do pagamento"
          value={formValues.title}
          onChange={handleChange}
        />

        <Label>Valor</Label>
        <Input
          type="number"
          name="value"
          step="0.01"
          placeholder="Valor do pagamento"
          value={formValues.value}
          onChange={handleChange}
        />

        <Label>Data de Vencimento</Label>
        <Input
          type="date"
          name="due_date"
          value={formValues.due_date}
          onChange={handleChange}
        />

        <Label>Fornecedor</Label>
        <Select
          name="supplier_id"
          value={formValues.supplier_id}
          onChange={handleChange}
        >
          <option value="">------</option>
          {data.suppliers.map((supplier: any) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.description}
            </option>
          ))}
        </Select>

        <Button type="button" className="mt-4" onClick={handleSubmit}>
          Criar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const PaymentDetailsModal = ({
  payment,
  onClose,
}: {
  payment: any;
  onClose: () => void;
}) => {
  const badge = badges[payment.status];

  return (
    <Dialog open={!!payment} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Pagamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Título: </span>
            {payment.title}
          </div>
          <div>
            <span className="font-semibold">Valor: </span>
            R$ {payment.value.toFixed(2).replace(".", ",")}
          </div>
          <div>
            <span className="font-semibold">Criação: </span>
            {formatDate(payment.creation_date)}
          </div>
          <div>
            <span className="font-semibold">Vencimento: </span>
            {formatDate(payment.due_date)}
          </div>
          <div>
            <span className="font-semibold">Pagamento: </span>
            {formatDate(payment.payment_date)}
          </div>
          <div>
            <span className="font-semibold">Usuário que Criou: </span>
            {payment.created_user.full_name}
          </div>
          <div>
            <span className="font-semibold">Usuário que Aprovou: </span>
            {payment.approved_user?.full_name ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Usuário que Pagou: </span>
            {payment.paid_user?.full_name ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Fornecedor: </span>
            {payment.supplier.description}
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            <Badge variant={badge.variant} className={badge.className}>
              {badge.text}
            </Badge>
          </div>
        </div>
        <Button className="mt-4" onClick={onClose}>
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const PaymentEditModal = ({
  payment,
  loadPayments,
  onClose,
}: {
  payment: any;
  loadPayments: () => void;
  onClose: () => void;
}) => {
  const [data, setData] = useState({
    suppliers: [],
  });

  const [formValues, setFormValues] = useState({
    title: payment.title,
    value: payment.value,
    due_date: formatDate(payment.due_date, "yyyy-MM-dd"),
    supplier_id: payment.supplier.id,
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getNewPaymentData();
      setData(data);
    }

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await editPayment(payment.id, formValues);
      onClose();
    } catch (error) {
      toast.error("Erro ao editar pagamento.");
    }
    loadPayments();
  };

  return (
    <Dialog open={!!payment} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pagamento: {payment.title}</DialogTitle>
        </DialogHeader>
        <Label>Nome</Label>
        <Input
          type="text"
          name="title"
          placeholder="Título do pagamento"
          value={formValues.title}
          onChange={handleChange}
        />

        <Label>Valor</Label>
        <Input
          type="number"
          name="value"
          step="0.01"
          placeholder="Valor do pagamento"
          value={formValues.value}
          onChange={handleChange}
        />

        <Label>Data de Vencimento</Label>
        <Input
          type="date"
          name="due_date"
          value={formValues.due_date}
          onChange={handleChange}
        />

        <Label>Fornecedor</Label>
        <Select
          name="supplier_id"
          value={formValues.supplier_id}
          onChange={handleChange}
        >
          {data.suppliers.map((supplier: any) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.description}
            </option>
          ))}
        </Select>

        <Button type="button" className="mt-4" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const PaymentFilesModal = ({
  paymentId,
  onClose,
}: {
  paymentId: number;
  onClose: () => void;
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    file: null as File | null,
  });

  useEffect(() => {
    async function fetchFiles() {
      const data = await listFiles(paymentId);
      setFiles(data);
    }

    fetchFiles();
  }, [paymentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setUploadForm({ ...uploadForm, file: files?.[0] || null });
    } else {
      setUploadForm({ ...uploadForm, [name]: value });
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.title) {
      alert("Preencha o título e selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", uploadForm.title);
    formData.append("file", uploadForm.file);

    try {
      await uploadFile(paymentId, formData);
      toast.success("Arquivo enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar arquivo.");
    }
    setUploadForm({ title: "", file: null });
    const data = await listFiles(paymentId);
    setFiles(data);
  };

  const handleDelete = async (fileId: number) => {
    if (!confirm("Tem certeza que deseja deletar este arquivo?")) return;
    try {
      await deleteFile(fileId);
      toast.success("Arquivo deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar arquivo");
    }
    const data = await listFiles(paymentId);
    setFiles(data);
  };

  const handleDownload = (fileId: number) => {
    const url = downloadFileURL(fileId);
    window.open(url, "_blank");
  };

  return (
    <Dialog open={!!paymentId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Arquivos do Pagamento</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Digite o título do arquivo"
            value={uploadForm.title}
            onChange={handleInputChange}
          />
          <Input
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
          />

          <Button onClick={handleUpload} className="mt-4">
            Enviar Arquivo
          </Button>
        </div>

        {!files.length ? (
          <div className="text-center border p-2">Nenhum arquivo vinculado</div>
        ) : (
          <Table className="mt-6 w-100">
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.title}</TableCell>
                  <TableCell className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(file.id)}
                    >
                      <FaDownload className="mr-2" />
                      Baixar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                    >
                      <FaTrash className="mr-2" />
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Button onClick={onClose} className="mt-6">
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const PendingAccounts = () => {
  const [data, setData] = useState({ loading: true, data: [] });
  const [viewPayment, setViewPayment] = useState<any>(null);
  const [editPayment, setEditPayment] = useState<any>(null);
  const [paymentFiles, setPaymentFiles] = useState<any>(null);

  async function loadPayments() {
    setData({ loading: true, data: [] });
    const data = await getPayments();
    setData({ loading: false, data });
  }

  async function removePayment(id: any) {
    if (!confirm("Tem certeza que deseja deletar este pagamento?")) {
      return;
    }
    try {
      await deletePayment(id);
    } catch (error) {
      toast.error("Erro ao deletar pagamento.");
    }
    loadPayments();
  }

  async function bulkDeletePayments(ids: any) {
    await Promise.all(ids.map((id: any) => deletePayment(id)));
    loadPayments();
  }

  async function changePaymentStatus(id: any, status: any) {
    const handler: any = {
      approve: approvePayment,
      reject: rejectPayment,
      pay: payPayment,
      cancel: cancelPayment,
    };
    const messages: any = {
      approve: "aprovado",
      reject: "rejeitado",
      pay: "realizado",
      cancel: "cancelado",
    };
    await handler[status](id);
    toast.success(`Pagamento ${messages[status]} com sucesso!`);
    loadPayments();
  }

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Contas à Pagar</CardTitle>
          <div className="absolute right-7 top-4 flex gap-2">
            <AddPaymentModal loadPayments={loadPayments} />
          </div>
        </CardHeader>
        <CardContent>
          <PaymentTable
            loading={data.loading}
            data={data.data}
            setViewPayment={setViewPayment}
            setPaymentFiles={setPaymentFiles}
            setEditPayment={setEditPayment}
            removePayment={removePayment}
            bulkDeletePayments={bulkDeletePayments}
            changePaymentStatus={changePaymentStatus}
          />
        </CardContent>
      </Card>
      {viewPayment && (
        <PaymentDetailsModal
          payment={viewPayment}
          onClose={() => setViewPayment(null)}
        />
      )}
      {editPayment && (
        <PaymentEditModal
          payment={editPayment}
          loadPayments={loadPayments}
          onClose={() => setEditPayment(null)}
        />
      )}
      {paymentFiles && (
        <PaymentFilesModal
          paymentId={paymentFiles}
          onClose={() => setPaymentFiles(null)}
        />
      )}
    </div>
  );
};

export default PendingAccounts;
