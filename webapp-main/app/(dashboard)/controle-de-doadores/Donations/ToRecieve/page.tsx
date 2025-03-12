"use client";

import { DataTable } from "@/components/compras-e-orcamentos/data-table";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const donations: any[] = [{ name: "Doação 1" }, { name: "Doação 2" }];

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 space-y-5">
      <Link href={"/controle-de-doadores/Donations"} passHref>
        <Button variant={"secondary"}>Todas as doações</Button>
      </Link>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Doações a receber
          </CardTitle>
          <Button variant={"outline"} size={"sm"}>
            <Check className="size-4 mr-2 bg-success" color="green" />
            Confirmar recebimento({0})
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={donations}
            filterKey="name"
            onDelete={(rows) => {
              console.log("Delete rows:", rows);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
