import { FC } from 'react';
import { PanelLayoutInfo } from '../../models/panelLayoutInfo';
import { createPanelLayout } from '../../services';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';
import { LayoutGenerator } from '../LayoutGenerator';
import { PanelLayoutForm } from '../PanelLayout';

export const CreatePanelLayout: FC = () => {
  const { name, description, items, rowGap, columnGap } =
    usePanelLayoutContext();

  const getTableTemplates = (): {
    rowsTemplate: string;
    columnsTemplate: string;
  } => {
    const tableContainerElement = document.getElementById(
      'tableContainer'
    ) as HTMLDivElement;

    const rowsTemplate = tableContainerElement.style.gridTemplateRows
      .replaceAll('fr', ' ')
      .replaceAll('  ', ' ')
      .trim();

    const columnsTemplate = tableContainerElement.style.gridTemplateColumns
      .replaceAll('fr', ' ')
      .replaceAll('  ', ' ')
      .trim();

    return { rowsTemplate, columnsTemplate };
  };

  const savePanelLayout = async (): Promise<void> => {
    const { rowsTemplate, columnsTemplate } = getTableTemplates();

    const newPanelLayout: PanelLayoutInfo = {
      name: name,
      description: description,
      rows: rowsTemplate,
      columns: columnsTemplate,
      rowGap,
      columnGap,
      panelLayoutZones: items,
    };

    await createPanelLayout(newPanelLayout);
  };

  return (
    <>
      <PanelLayoutForm
        formTitle="Create a new Panel Layout"
        submitForm={savePanelLayout}
        withModal={false}
      ></PanelLayoutForm>

      <LayoutGenerator />
    </>
  );
};
