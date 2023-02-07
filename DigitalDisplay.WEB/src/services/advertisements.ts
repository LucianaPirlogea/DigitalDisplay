import API, { defaultHeaders } from '../api';
import { Advertisement } from '../models/advertisement';

export async function getAdvertisements() {
  const res = await API.get<Advertisement[]>('Advertisement', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function addAdvertisement(advertisement: Advertisement) {
  const res = await API.post<Advertisement>(
    'Advertisement/AddAdvertisement',
    advertisement,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}

export async function duplicateAdvertisement(advertisementId: number) {
  const res = await API.post<Advertisement>(
    `Advertisement/Duplicate/${advertisementId}`,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}

export async function getSpecificAdvertisement(advertisementId: number) {
  const res = await API.get<Advertisement>(`Advertisement/${advertisementId}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}

export async function updateAdvertisement(
  id: number,
  advertisement: Advertisement
) {
  const res = await API.put<Advertisement>(
    `Advertisement/Edit/${id}`,
    advertisement,
    {
      redirectWhenUnauthorized: false,
      headers: defaultHeaders,
    }
  );
  return res;
}

export async function removeAdvertisement(id: number) {
  const res = await API.delete<Advertisement>(`Advertisement/Delete/${id}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function advertisementArchive(id: number) {
  const res = await API.put<Advertisement>(`Advertisement/Archive/${id}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}

export async function advertisementUnarchive(id: number) {
  const res = await API.put<Advertisement>(`Advertisement/Unarchive/${id}`, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
