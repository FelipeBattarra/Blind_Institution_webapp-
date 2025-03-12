import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Componente genérico que aceita qualquer tipo de dados
interface TableProps<T> { 
  items: T[];  // Lista de itens que seguem a interface genérica T
  renderers?: Partial<Record<keyof T, (value: any, item: T) => JSX.Element>>;  // Funções de renderização customizada
}

export default function GenericTable<T extends Record<string, any>>({ items, renderers = {} }: TableProps<T>) {
  // Pega as chaves da interface do primeiro item para gerar as colunas
  const keys = items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <div className="container mx-auto mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            {keys.map((key) => (
              <TableHead key={key}>{key}</TableHead>  // Exibe o nome da chave como título da coluna
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {keys.map((key) => {
                const cellValue = item[key];
                // Verifica se há um renderizador customizado para a chave
                const renderCustom = renderers[key as keyof T];
                return (
                  <TableCell key={key}>
                    {renderCustom ? renderCustom(cellValue, item) : cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
