import CurrencyInput from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number | undefined) => void;
  placeholder?: number;
  disabled?: boolean;
};

const MaximumBudgetInput = ({ value, onChange, placeholder, disabled }: Props) => {
  const parsedValue = parseFloat(Number(value).toFixed(2));

  const onReverseValue = () => {
    if (!value) return;

    onChange(parseFloat(Number(value).toFixed(2)) * -1);
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition bg-emerald-500 hover:bg-emerald-600",
              )}
            >
              {<PlusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Adicionar um valor para definir o orçamento
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        ref={(ref) => ref?.focus()}
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        onValueChange={(value) => onChange(value ? parseFloat(value) : undefined)}
        disabled={disabled}
        inputMode="decimal"
      />
    </div>
  );
};

export default MaximumBudgetInput;
