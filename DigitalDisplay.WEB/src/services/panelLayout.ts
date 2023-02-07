import API, { defaultHeaders } from '../api';
import { PanelLayout, PanelLayoutData } from '../models/panelLayout';
import { PanelLayoutInfo } from '../models/panelLayoutInfo';

export async function getPanelLayouts() {
  const res = await API.get<PanelLayout[]>('PanelLayout', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function getPanelLayout(panelLayoutId: number) {
  const res = await API.get<PanelLayoutInfo>(`PanelLayout/${panelLayoutId}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function removePanelLayout(id: number) {
  const res = await API.delete<PanelLayout>(`PanelLayout/DeleteLayout/${id}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function createPanelLayout(panelLayout: PanelLayoutInfo) {
  const res = await API.post<PanelLayoutInfo>(
    'PanelLayout/AddLayout',
    panelLayout,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}

export async function getPanelLayoutsData() {
  const res = await API.get<PanelLayoutData[]>('PanelLayout/PanelLayoutsData', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function updatePanelLayout(
  id: string,
  panelLayout: PanelLayoutInfo
) {
  const res = await API.put<PanelLayoutInfo>(`PanelLayout/${id}`, panelLayout, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}

export async function duplicatePanelLayout(id: number) {
  const res = await API.post<PanelLayout>(
    `PanelLayout/DuplicatePanelLayout/${id}`,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );

  return res;
}
