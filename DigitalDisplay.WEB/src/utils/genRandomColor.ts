export const getRandomColor = (): string => {
  return (
    'hsl(' +
    // hue
    360 * Math.random() +
    ',' +
    // saturation between 25-95%
    (45 + 70 * Math.random()) +
    '%,' +
    // lightness between 25-95%
    (65 + 10 * Math.random()) +
    '%)'
  );
};
