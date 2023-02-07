import { defaultHeaders } from '.';
import { SPACE_PATH } from '../services/variables';

const route = 'employees';
export async function getEmployees() {
  const requestOptions = {
    method: 'GET',
    defaultHeaders,
  };

  const res = await fetch(SPACE_PATH + route, requestOptions);
  const data = await res.json();
  return data;
}
