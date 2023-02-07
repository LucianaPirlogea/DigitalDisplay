import { fileResponse } from '../models/fileResponse';
import { MEDIA_API_PATH } from '../services/variables';

export async function uploadFile(path: string, file: FormData) {
  const requestOptions = {
    method: 'POST',
    body: file,
  };
  const res = await fetch(path + 'UploadImage', requestOptions);
  const data = await res.text();
  return data;
}

export async function uploadChunk(chunk: Blob, id: number, fileName: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: chunk,
  };
  const res = await fetch(
    MEDIA_API_PATH + 'UploadChunks?id=' + id + '&fileName=' + fileName,
    requestOptions
  );
  const data: fileResponse = await res.json();
  return data;
}

export async function uploadComplete(formData: FormData, fileName: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const res = await fetch(
    MEDIA_API_PATH +
      'UploadComplete?formData=' +
      formData +
      '&fileName=' +
      fileName,
    requestOptions
  );
  const data: fileResponse = await res.json();
  return data;
}

export async function duplicateAdvertisementContentContent(fileName: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fileName),
  };
  const res = await fetch(
    MEDIA_API_PATH + 'DuplicateAdvertisement',
    requestOptions
  );
  const data = res.text();
  return data;
}

export async function deleteAdvertisementContent(fileName: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fileName),
  };

  const res = await fetch(
    MEDIA_API_PATH + 'DeleteAdvertisement',
    requestOptions
  );
  return res;
}
