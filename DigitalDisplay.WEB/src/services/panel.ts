import API, { defaultHeaders } from '../api';
import { CreatePanelInfo } from '../models/createPanelInfo';

export async function createPanel(panel: CreatePanelInfo) {
  const res = await API.post<CreatePanelInfo>('Panel/AddPanel', panel, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
