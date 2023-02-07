import {
  BASE_TO_POWER,
  DEFAULT_DECIMAL,
  DEFAULT_SIZES,
} from '../services/variables';

export function formatBytes(bytes: number, decimals = DEFAULT_DECIMAL) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;

  const sizeType = Math.floor(Math.log(bytes) / Math.log(BASE_TO_POWER));

  return (
    parseFloat((bytes / Math.pow(BASE_TO_POWER, sizeType)).toFixed(dm)) +
    ' ' +
    DEFAULT_SIZES[sizeType]
  );
}
