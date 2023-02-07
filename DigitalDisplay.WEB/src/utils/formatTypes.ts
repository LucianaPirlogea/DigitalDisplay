interface VERTICAL_ALIGNMENT_INTERFACE {
  id: number;
  alignment: string;
}

interface HORIZONTAL_ALIGNMENT_INTERFACE {
  id: number;
  alignment: string;
}

interface SCROLLING_TEXT_INTERFACE {
  id: number;
  alignment: string;
}
export const VERTICAL_ALIGNMENT: VERTICAL_ALIGNMENT_INTERFACE[] = [
  {
    id: 0,
    alignment: 'top',
  },
  {
    id: 1,
    alignment: 'middle',
  },
  {
    id: 2,
    alignment: 'bottom',
  },
];

export const HORIZONTAL_ALIGNMENT: HORIZONTAL_ALIGNMENT_INTERFACE[] = [
  {
    id: 0,
    alignment: 'left',
  },
  {
    id: 1,
    alignment: 'center',
  },
  {
    id: 2,
    alignment: 'right',
  },
];
export const SCROLLING_TEXT: SCROLLING_TEXT_INTERFACE[] = [
  {
    id: 0,
    alignment: 'none',
  },
  {
    id: 1,
    alignment: 'horizontal',
  },
  {
    id: 2,
    alignment: 'vertical',
  },
];
