"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { toast } from "sonner";
import { LucideMousePointerClick, PlusCircleIcon } from "lucide-react";
import { ReactNode } from "react";
import { DonationItems } from "./donationItems";

interface DonationActionsProps {
  title: string;
  icon: ReactNode;
}

const DonationActions = ({ title, icon }: DonationActionsProps) => {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row gap-2">
          {icon} {title} doação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} doação</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="donorName">Nome do doador</Label>
          <div className="flex flex-row items-center gap-5">
            <Input
              name="donorName"
              placeholder="Selecione o(s) doador(es)..."
            />
            <Button variant={"ghost"}>
              <LucideMousePointerClick />
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Itens da doação</CardTitle>
              <CardDescription>
                Selecione os itens e suas quantidades!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonationItems />
            </CardContent>
            <CardFooter className="flex items-center justify-center mt-8">
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    toast(
                      title == "Solicitar"
                        ? "Doação solicitada com sucesso!"
                        : "Doação inserida com sucesso!",
                      {
                        action: {
                          label: "OK",
                          onClick: () => console.log("Ok"),
                        },
                      }
                    )
                  }
                >
                  {title} Doação
                </Button>
                {/* ADICIONAR ENVIO DE SOLICITAÇÃO DE DOAÇÃO/ADD DOAÇÃO */}
              </DialogClose>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DonationActions;
