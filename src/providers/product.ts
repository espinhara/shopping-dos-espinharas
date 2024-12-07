import { PaginatedResponse } from "../interfaces/paginatedProductsResponse"
import { api } from "./api"


export const search = async (page: number, setLoading: (load: boolean) => void, search: string) => {
  setLoading(true)
  try {
    const response = await api.get<PaginatedResponse>(`products/search/`, {
      params: {
        page,
        limit: 10,
        search,
      }
    })
    const { items, currentPage, totalPages } = response.data;
    return { items, currentPage, totalPages }
  } catch (error) {
    alert('Ocorreu um erro ao pesquisar');
  } finally {
    setLoading(false);
  }
}