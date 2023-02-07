import { FC, useCallback, useEffect, useState } from 'react';
import { Item } from '../../models/gridLayout';
import { PanelLayoutInfo } from '../../models/panelLayoutInfo';
import { getPanelLayout, updatePanelLayout } from '../../services';
import { LayoutGenerator } from '../LayoutGenerator';
import { PanelLayoutForm } from '../PanelLayout';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const EditPanelLayout: FC = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    setNoRows,
    setNoCols,
    items,
    setItems,
    rowGap,
    setRowGap,
    columnGap,
    setColumnGap,
    setRowsTemplate,
    setColumnsTemplate,
  } = usePanelLayoutContext();

  const [isLoading, setIsLoading] = useState(false);

  const { panelLayoutId } = useParams();
  const [searchParams] = useSearchParams();

  const zonesNumber = Number(searchParams.get('zones'));
  const panelsNumber = Number(searchParams.get('panels'));
  const activateModal = panelsNumber > 0 || zonesNumber !== items.length;

  const addIdOnPanelLayoutZones = (
    panelLayoutZones: Omit<Item, 'id'>[]
  ): Item[] => {
    let newItems: Item[] = [];

    panelLayoutZones.forEach((panelLayoutZone) => {
      const id = `item-${panelLayoutZone.rowStart}-${panelLayoutZone.columnStart}`;

      const newItem: Item = { id, ...panelLayoutZone };

      newItems.push(newItem);
    });

    return newItems;
  };

  const getTemplateCount = (str: string) => {
    const count = str.split(' ').length;
    return count;
  };

  const getPanelLayoutData = useCallback(async () => {
    setIsLoading(true);
    const res = await getPanelLayout(Number(panelLayoutId));

    if (res) {
      setName(res.name);
      setDescription(res.description);

      const noRows = getTemplateCount(res.rows);
      const noCols = getTemplateCount(res.columns);

      setNoRows(noRows);
      setNoCols(noCols);

      setRowsTemplate(res.rows.split(' '));
      setColumnsTemplate(res.columns.split(' '));

      setRowGap(res.rowGap);
      setColumnGap(res.columnGap);

      const itemsWithId: Item[] = addIdOnPanelLayoutZones(res.panelLayoutZones);
      setItems(itemsWithId);

      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPanelLayoutData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updatePanelLayoutData = async (): Promise<void> => {
    const { rowsTemplate, columnsTemplate } = getTableTemplates();

    if (isEmptySpace(name.trim())) {
      return;
    }

    const newPanelLayout: PanelLayoutInfo = {
      name: name,
      description: description,
      rows: rowsTemplate,
      columns: columnsTemplate,
      rowGap,
      columnGap,
      panelLayoutZones: items,
    };

    if (panelLayoutId) {
      await updatePanelLayout(panelLayoutId, newPanelLayout);
    }
  };

  const isEmptySpace = (str: string): boolean => str === '';

  return (
    <>
      <PanelLayoutForm
        formTitle="Edit Panel Layout"
        submitForm={updatePanelLayoutData}
        withModal={activateModal}
      ></PanelLayoutForm>
      <LayoutGenerator loaded={!isLoading} />
      <LoadingSpinner show={isLoading} />
    </>
  );
};
