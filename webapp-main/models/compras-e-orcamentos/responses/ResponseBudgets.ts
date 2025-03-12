import { Budgets } from "../Budgets";

export type ResponseBudgets = {
  data: Budgets[];
  page: number;
  itemsPerPage: number;
  totalPages: number;
};