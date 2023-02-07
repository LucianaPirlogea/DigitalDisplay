import API, { defaultHeaders } from '../api';
import { AdvertisementType } from '../models/advertisementType';

export async function getAdvertisementsType() {
  const res = await API.get<AdvertisementType[]>('AdvertisementType', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
