import { FC } from 'react';
import { Item } from '../../models/gridLayout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';

function expandTop(
  columnStart: number,
  columnSpan: number,
  rowStart: number,
  rowSpan: number,
  cell: HTMLDivElement
) {
  for (let i = columnStart; i < columnStart + columnSpan; i++) {
    document.getElementById(`item-${rowStart - 1}-${i}`)?.remove();
  }

  rowStart -= 1;
  rowSpan += 1;

  cell.style.gridRowStart = rowStart.toString();

  return { rowStart, rowSpan };
}

function expandRight(
  rowStart: number,
  rowSpan: number,
  columnStart: number,
  columnSpan: number,
  cell: HTMLDivElement
) {
  for (let i = rowStart; i < rowStart + rowSpan; i++) {
    document.getElementById(`item-${i}-${columnStart + columnSpan}`)?.remove();
  }

  columnSpan += 1;
  cell.style.gridColumnEnd = (columnStart + columnSpan).toString();

  return columnSpan;
}

function expandLeft(
  rowStart: number,
  rowSpan: number,
  columnStart: number,
  columnSpan: number,
  cell: HTMLDivElement
) {
  for (let i = rowStart; i < rowStart + rowSpan; i++) {
    document.getElementById(`item-${i}-${columnStart - 1}`)?.remove();
  }

  columnStart -= 1;
  columnSpan += 1;

  cell.style.gridColumnStart = columnStart.toString();

  return { columnStart, columnSpan };
}

function expandDown(
  columnStart: number,
  columnSpan: number,
  rowStart: number,
  rowSpan: number,
  cell: HTMLDivElement
) {
  for (let i = columnStart; i < columnStart + columnSpan; i++) {
    document.getElementById(`item-${rowStart + rowSpan}-${i}`)?.remove();
  }

  rowSpan += 1;
  cell.style.gridRowEnd = (rowStart + rowSpan).toString();

  return rowSpan;
}

export const expandItem = (
  item: Item,
  cellId: string,
  direction: string,
  span: number
): Item => {
  // find the index of the item that will be expanded

  let { id, rowStart, rowSpan, columnStart, columnSpan } = item;

  // get cell element that will be expanded
  const cell = document.getElementById(cellId) as HTMLDivElement;
  if (cell) {
    for (let k = 0; k < span; k++) {
      switch (direction) {
        case 'top':
          ({ rowStart, rowSpan } = expandTop(
            columnStart,
            columnSpan,
            rowStart,
            rowSpan,
            cell
          ));
          break;
        case 'down':
          rowSpan = expandDown(
            columnStart,
            columnSpan,
            rowStart,
            rowSpan,
            cell
          );

          break;
        case 'left':
          ({ columnStart, columnSpan } = expandLeft(
            rowStart,
            rowSpan,
            columnStart,
            columnSpan,
            cell
          ));

          break;
        case 'right':
          columnSpan = expandRight(
            rowStart,
            rowSpan,
            columnStart,
            columnSpan,
            cell
          );

          break;
        default:
          break;
      }
    }
  }

  return { id, rowStart, rowSpan, columnStart, columnSpan };
};

interface Props {
  itemId: string;
}

export const CellArrows: FC<Props> = ({ itemId }) => {
  const { items, setItems } = usePanelLayoutContext();

  const directions = ['top', 'down', 'left', 'right'];
  const arrowIcons = [
    <KeyboardArrowUpIcon />,
    <KeyboardArrowDownIcon />,
    <KeyboardArrowLeftIcon />,
    <KeyboardArrowRightIcon />,
  ];

  const renderArrows = () => {
    let arrows: any = [];
    for (let i = 0; i < directions.length; i++) {
      const itemIndex = items.findIndex((item: Item) => item.id === itemId);
      const cellId = `${itemId}-used`;
      arrows.push(
        <div
          key={i}
          className={`resize-${directions[i]} hide`}
          onClick={() => {
            const updatedItem = expandItem(
              items[itemIndex],
              cellId,
              directions[i],
              1
            );

            const updatedItems = [...items];
            updatedItems[itemIndex] = updatedItem;
            setItems(updatedItems);
          }}
        >
          {arrowIcons[i]}
        </div>
      );
    }
    return arrows;
  };

  return <>{renderArrows()}</>;
};
