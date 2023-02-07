import { FC } from 'react';

interface Props {
  error: Error;
}
export const ErrorFallBack: FC<Props> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};
