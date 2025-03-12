import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MaximumBudgetInput from "@/components/compras-e-orcamentos/maximum-budget-input";

const insertCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(3, "Nome da categoria deve ter no mínimo 3 caracteres.").max(120, "Nome da categoria deve ter no máximo 120 caracteres."),
  maximumBudget: z.number().positive("Limite máximo de gasto deve ser um número positivo."),
});

const formSchema = insertCategorySchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: number;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const CategoryForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Ex: Comida, Viagem, Lazer etc.."
                  {...field}
                />
              </FormControl>
              {form.formState.errors.name && (
                <FormMessage>{form.formState.errors.name.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="maximumBudget"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <MaximumBudgetInput
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              {form.formState.errors.maximumBudget && (
                <FormMessage>{form.formState.errors.maximumBudget.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Salvar alterações" : "Criar categoria"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant={"outline"}
          >
            <Trash className="size-4 mr-2" />
            Deletar categoria?
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
