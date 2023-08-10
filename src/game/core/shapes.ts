import ShapeObject from "../types/shape";

const shapes: ShapeObject[] = [
  {
    matrix: [[1, 1, 1, 1]],
    color: "#00f0f0",
  },
  {
    matrix: [[1], [1, 1, 1]],
    color: "#0000f5",
  },
  {
    matrix: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#f0a000",
  },
  {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000",
  },
  {
    matrix: [
      [0, 1, 1],
      [1, 1],
    ],
    color: "#00f000",
  },
  {
    matrix: [
      [0, 1],
      [1, 1, 1],
    ],
    color: "#a000f0",
  },
  {
    matrix: [
      [1, 1],
      [0, 1, 1],
    ],
    color: "#f00000",
  },
];

/**
 * Return a random shape
 * @returns
 */
function getRandomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}

export { shapes, getRandomShape };
