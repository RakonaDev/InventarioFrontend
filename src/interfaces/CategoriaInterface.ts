export interface CategoriaInterface {
  id?: number
  nombre: string
  descripcion: string
  created_at?: Date
  updated_at?: Date
}

// Interfaces para tipar las respuestas de la API
export interface CategoriasResponse {
  categorias: CategoriaInterface[];
  currentPage: number;
  totalPages: number;
}

export interface CategoriaResponse {
  categorias: CategoriaInterface;
}

// Zustand
export interface CategoryPaginate {
  currentPage: number
}

export interface CategoryPaginateItem {
  currentPage: number;
  categoryItems: CategoriaInterface[];
}

export interface CategoryPaginateActions {
  setCategoryPaginate: (currentPage: number) => void;
}