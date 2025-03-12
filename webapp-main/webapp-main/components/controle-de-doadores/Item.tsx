import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideMousePointerClick, X } from "lucide-react";

const Item = () => {
  return (
    <div className="space-y-3 mt-3 mx-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="item">Ítem da doação</Label>
          <Button variant={"destructive"} size={"sm"} className="rounded-full">
            <X size={"14px"} />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-5">
          <Input name="item" placeholder="Selecione o ítem" />
          <Button variant={"ghost"}>
            <LucideMousePointerClick />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <Label htmlFor="quantity">Quantidade</Label>
        <Input
          name="quantity"
          type="number"
          placeholder="Insira a quantidade de itens"
        />
      </div>
    </div>
  );
};

export default Item;
