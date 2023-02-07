import API, { defaultHeaders } from '../api';
import { devicePanel } from '../models/devicesPanel';

export async function assignDevicesPanel(devicesPanel: devicePanel[]) {
  const res = await API.post<number[]>(
    'DevicePanel/AssignPanelDevice',
    devicesPanel,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}

export async function removeDevicePanel(idDevicePanel: number) {
  const res = await API.delete<number | null>(`DevicePanel/${idDevicePanel}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
