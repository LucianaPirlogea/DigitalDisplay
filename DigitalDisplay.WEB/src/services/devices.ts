import API, { defaultHeaders } from '../api';
import { DeviceInfo } from '../models/deviceInfo';

export async function getDevices() {
  const res = await API.get<DeviceInfo[]>('Device', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}
