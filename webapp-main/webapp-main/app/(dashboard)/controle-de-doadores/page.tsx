"use client";

import { DataTable } from "@/components/controle-de-doadores/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import DonationActions from "@/components/controle-de-doadores/donationActions";
import { FaDonate } from "react-icons/fa";

export default function Donors() {
  const donors: any[] = [
    {
      id: "1",
      name: "Luis Felipe Mozer Chiqueto",
      period: "Mensal",
      phone: "+55 99 99999-9999",
      type: "Empresa",
    },
    {
      id: "2",
      name: "Guilherme",
      period: "Semestral",
      phone: "+55 99 99999-9999",
      type: "Pessoa",
    },
  ];

  const handleDelete = (id: string) => {
    console.log(`Delete donation with id: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Doadores</CardTitle>
          <div className="absolute right-7 top-4 flex gap-2">
            <Button size={"sm"}>
              <Plus className="size-4 mr-2" />
              Adicionar novo
            </Button>
            <DonationActions title="Solicitar" icon={<FaDonate />} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={donors}
            filterKey="name"
            onDelete={(rows) => {
              console.log("Deleted rows:", rows);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}