import API, { defaultHeaders } from '../api';
import { EditPanelInfo, PanelInfo } from '../models/panelOverview';

export async function getPanels() {
  const res = await API.get<PanelInfo[]>('Panel', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function removePanel(id: number) {
  const res = await API.delete<PanelInfo>(`Panel/${id}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function duplicatePanel(id: number, fileName: string) {
  const res = await API.post<PanelInfo>(
    `Panel/DuplicatePanel/${id}&=${fileName}`,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );

  return res;
}

export async function updatePanel(panel: EditPanelInfo) {
  const res = await API.put<EditPanelInfo>(
    `Panel/UpdatePanel/{panel.id}`,
    panel,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}
