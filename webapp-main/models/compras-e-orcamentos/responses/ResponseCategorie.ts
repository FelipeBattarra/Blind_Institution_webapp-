import { Categorie } from "../Categorie";

export type ResponseCategorie = {
  data: Categorie[];
  page: number;
  itemsPerPage: number;
  totalPages: number;
};