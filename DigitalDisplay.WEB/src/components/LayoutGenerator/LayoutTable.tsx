import { FC, useEffect } from 'react';
import { Item } from '../../models/gridLayout';
import { getRandomColor } from '../../utils/genRandomColor';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';
import { CellArrows, expandItem } from './CellArrows';

const expandAddedItems = (items: Item[] | []) => {
  let itemsResult: Item[] = [];

  items.forEach((item) => {
    let itemResult: any = {};
    itemResult.id = item.id;
    itemResult.rowStart = item.rowStart;
    itemResult.columnStart = item.columnStart;
    itemResult.rowSpan = 1;
    itemResult.columnSpan = 1;

    itemResult = expandItem(
      itemResult,
      itemResult.id,
      'down',
      item.rowSpan - 1
    );

    itemResult = expandItem(
      itemResult,
      itemResult.id,
      'right',
      item.columnSpan - 1
    );

    itemsResult.push(itemResult);
  });

  return itemsResult;
};

export const LayoutTable: FC = () => {
  const { noRows, noCols, items, setItems } = usePanelLayoutContext();

  const updateItemColor = (id: string) => {
    // find item div
    const itemElement = document.getElementById(id) as HTMLDivElement;

    if (itemElement) {
      // change id so we know that the cell is not an empty cell
      itemElement.id = `${itemElement.id}-used`;
      if (!itemElement.classList.contains('active')) {
        itemElement.classList.add('active');

        // change item background
        itemElement.style.backgroundColor = getRandomColor();
      }
    }
  };

  const addItem = (rowIndex: number, colIndex: number): Item[] | [] => {
    const id = `item-${rowIndex}-${colIndex}`;

    if (items.find((item: Item) => item.id === id)) {
      return [];
    }

    const newItem = {
      id,
      rowStart: rowIndex,
      rowSpan: 1,
      columnStart: colIndex,
      columnSpan: 1,
    };

    const updatedItems = [...items, newItem];

    return updatedItems;
  };

  const updateResizeButtons = (): void => {
    items.forEach((item: Item) => {
      // check if there are empty cells above the current item
      // top
      let isTopEmpty = true;
      for (
        let i = item.columnStart;
        i < item.columnStart + item.columnSpan;
        i++
      ) {
        if (!document.getElementById(`item-${item.rowStart - 1}-${i}`)) {
          isTopEmpty = false;
        }
      }

      // bottom
      let isBottomEmpty = true;
      for (
        let i = item.columnStart;
        i < item.columnStart + item.columnSpan;
        i++
      ) {
        if (
          !document.getElementById(`item-${item.rowStart + item.rowSpan}-${i}`)
        ) {
          isBottomEmpty = false;
        }
      }

      // left
      let isLeftEmpty = true;
      for (let i = item.rowStart; i < item.rowStart + item.rowSpan; i++) {
        if (!document.getElementById(`item-${i}-${item.columnStart - 1}`)) {
          isLeftEmpty = false;
        }
      }

      // right
      let isRightEmpty = true;
      for (let i = item.rowStart; i < item.rowStart + item.rowSpan; i++) {
        if (
          !document.getElementById(
            `item-${i}-${item.columnStart + item.columnSpan}`
          )
        ) {
          isRightEmpty = false;
        }
      }

      // find current item DOM element and its resize buttons
      const ItemElement = document.getElementById(
        `${item.id}-used`
      ) as HTMLDivElement;
      const resizeTopButton = ItemElement?.getElementsByClassName(
        'resize-top'
      )[0] as HTMLDivElement;
      const resizeDownButton = ItemElement?.getElementsByClassName(
        'resize-down'
      )[0] as HTMLDivElement;
      const resizeLeftButton = ItemElement?.getElementsByClassName(
        'resize-left'
      )[0] as HTMLDivElement;
      const resizeRightButton = ItemElement?.getElementsByClassName(
        'resize-right'
      )[0] as HTMLDivElement;

      if (!isTopEmpty) {
        resizeTopButton?.classList.add('hide');
      } else {
        resizeTopButton?.classList.remove('hide');
      }

      if (!isBottomEmpty) {
        resizeDownButton?.classList.add('hide');
      } else {
        resizeDownButton?.classList.remove('hide');
      }

      if (!isLeftEmpty) {
        resizeLeftButton?.classList.add('hide');
      } else {
        resizeLeftButton?.classList.remove('hide');
      }

      if (!isRightEmpty) {
        resizeRightButton?.classList.add('hide');
      } else {
        resizeRightButton?.classList.remove('hide');
      }
    });
  };

  useEffect(() => {
    const expandedItems = expandAddedItems(items);
    setItems(expandedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (items.length) {
      items.forEach((item) => {
        updateItemColor(item.id);
        updateResizeButtons();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const renderCells = () => {
    const cells = [];

    for (let i = 1; i <= noRows; i++) {
      for (let j = 1; j <= noCols; j++) {
        const id = `item-${i}-${j}`;
        cells.push(
          <div
            className="layoutTableCell"
            id={id}
            key={`${i}${j}`}
            style={{
              border: '1px solid black',
              gridColumnStart: j,
              gridColumnEnd: j + 1,
              gridRowStart: i,
              gridRowEnd: i + 1,
            }}
            onClick={(e) => {
              if (
                e.target === e.currentTarget &&
                !items.find((item) => item.id === id)
              ) {
                const updatedItems = addItem(i, j);
                setItems(updatedItems);
              }
            }}
          >
            <CellArrows itemId={id} />
          </div>
        );
      }
    }
    return cells;
  };

  return <>{renderCells()}</>;
};
