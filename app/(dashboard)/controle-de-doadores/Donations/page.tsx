"use client";

import { DataTable } from "@/components/compras-e-orcamentos/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import { PlusIcon } from "lucide-react";
import { columns } from "./columns";
import Link from "next/link";
import { FaDonate } from "react-icons/fa";
import DonationActions from "@/components/controle-de-doadores/donationActions";

export default function Donations() {
  const donations: any[] = [
    { name: "Doação 1", date: "01/01/2024", type: "F", value: 0, amount: 10 },
    { name: "Doação 2", date: "02/01/2024", type: "M", value: 100, amount: 0 },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 space-y-5">
      <Link href={"/controle-de-doadores/donations/torecieve"} passHref>
        <Button variant={"secondary"}>Doações a receber</Button>
      </Link>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Doações</CardTitle>
          <div className="flex flex-row gap-5">
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
              console.log("Deleted rows:", rows);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
