import API, { defaultHeaders } from '../api';
import { Category } from '../models/category';

export async function getCategories() {
  const res = await API.get<Category[]>('Category', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
