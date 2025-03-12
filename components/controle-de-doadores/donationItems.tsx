"use client";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LucideMousePointerClick,
  PlusCircleIcon,
  PlusIcon,
} from "lucide-react";
import Item from "./Item";

interface DonationItemsProps {
  donor: string;
  quantity: number;
}

export function DonationItems() {
  const [items, setItems] = React.useState<DonationItemsProps[]>([
    { donor: "", quantity: 0 },
  ]);

  React.useEffect(() => {
    setItems([{ donor: "", quantity: 0 }]);
  }, []);

  function addItem() {
    setItems((prevItems) => [...prevItems, { donor: "", quantity: 0 }]);
    console.log(items);
  }

  function removeItem() {}

  return (
    <>
      <ScrollArea className="h-60 rounded-md border p-2">
        {items.map((item, index) => (
          <div key={index} className="space-y-5">
            <Item />
            <Separator />
          </div>
        ))}
      </ScrollArea>

      <div
        className="float-right mt-2 p-3 rounded-full bg-lime-400 cursor-pointer hover:bg-lime-500 "
        onClick={addItem}
      >
        <PlusIcon size={"20px"} className="text-white" />
      </div>
    </>
  );
}
