import { FC } from 'react';
import { PanelProvider } from '../Providers/PanelProvider';
import { NewPanel } from './NewPanel';

export const CreatePanel: FC = () => {
  return (
    <PanelProvider>
      <NewPanel />
    </PanelProvider>
  );
};
