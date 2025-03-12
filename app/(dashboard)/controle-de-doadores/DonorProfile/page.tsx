"use client";

import { DataTable } from "@/components/compras-e-orcamentos/data-table";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaDonate } from "react-icons/fa";
import { PlusIcon } from "lucide-react";
import { columns } from "./columns";
import DonationActions from "@/components/controle-de-doadores/donationActions";

export default function Donations() {
  const donations: any[] = [
    {
      id: "1",
      name: "Doação 1",
      date: "01/01/2024",
      type: "F",
      value: 0,
      amount: 10,
    },
    {
      id: "2",
      name: "Doação 2",
      date: "02/01/2024",
      type: "M",
      value: 100,
      amount: 0,
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto mb-10 w-full pb-10 -mt-24">
      {/* Inputs de Informação do Doador */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Digite o email" />
        </div>
        <div>
          <Label htmlFor="dob">Data Nascimento</Label>
          <Input type="date" id="dob" />
        </div>
        <div>
          <Label htmlFor="donation-period">Período de Doação</Label>
          <Input
            type="text"
            id="donation-period"
            placeholder="Ex: Jan 2023 - Dez 2023"
          />
        </div>
        <div>
          <Label htmlFor="social-media">Rede Social</Label>
          <Input type="text" id="social-media" placeholder="Ex: @usuario" />
        </div>
      </div>

      {/* Resumo de Doações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Última Doação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 100,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Maior Doação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 150,00</p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Doações */}
      <Card className="border-none drop-shadow-sm mt-5">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl">Histórico de Doações</CardTitle>
          <div className="flex gap-5">
            <DonationActions title="Solicitar" icon={<FaDonate />} />
            <DonationActions title="Adicionar" icon={<PlusIcon />} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={donations}
            filterKey="name"
            onDelete={(rows) => {
              // Implement your delete logic here
              console.log("Deleted rows:", rows);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
