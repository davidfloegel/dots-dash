/**
 * Generates top left coordinates for the boxes that are being generated
 *
 *  1---2---3
 *  |   |   |
 *  4---5---6
 *  |   |   |
 *  7---8---9
 *
 */
const makeGrid = dots => {
  let grid = {};

  // let rowIndex = 0;
  let addRowIndex = 0;
  for (let i = 1; i <= (dots - 1) * (dots - 1); i++) {
    if ((i + addRowIndex) % dots === 0) {
      addRowIndex += 1;
    }

    grid[i] = [i + addRowIndex];
  }

  Object.keys(grid).forEach(index => {
    const startCoord = grid[index][0];

    grid[index] = [
      startCoord,
      startCoord + 1,
      startCoord + dots,
      startCoord + dots + 1
    ];
  });

  return grid;
};

const areDotsConnectable = (grid, pointA, pointB) => {
  let connectable = false;

  Object.keys(grid).forEach(box => {
    const coords = grid[box];
    const [topLeft, topRight, bottomLeft, bottomRight] = coords;

    // No this is shit
  });

  return "what";
};

const connectDots = (grid, connections = {}, user, pointA, pointB) => {
  // TODO check if the two dots are connectable

  const lower = pointA < pointB ? pointA : pointB;
  const higher = pointA > pointB ? pointA : pointB;
  const key = `${lower}-${higher}`;

  const connectable = areDotsConnectable(grid, lower, higher);

  if (connections[key]) {
    return connections;
  }

  connections[key] = user;

  return connections;
};

describe("Grid", () => {
  it("generates a new 3 dot grid", () => {
    const dots = 3;

    const generatedGrid = makeGrid(dots);

    expect(Object.keys(generatedGrid)).toHaveLength(4);
    expect(generatedGrid).toEqual({
      1: [1, 2, 4, 5],
      2: [2, 3, 5, 6],
      3: [4, 5, 7, 8],
      4: [5, 6, 8, 9]
    });
  });

  it("generates a new 4 dot grid", () => {
    const dots = 4;

    const generatedGrid = makeGrid(dots);

    expect(Object.keys(generatedGrid)).toHaveLength(9);
    expect(generatedGrid).toEqual({
      1: [1, 2, 5, 6],
      2: [2, 3, 6, 7],
      3: [3, 4, 7, 8],
      4: [5, 6, 9, 10],
      5: [6, 7, 10, 11],
      6: [7, 8, 11, 12],
      7: [9, 10, 13, 14],
      8: [10, 11, 14, 15],
      9: [11, 12, 15, 16]
    });
  });
});

describe("Are dots connectable?", () => {
  it("returns true if dots are connectable", () => {
    const grid = makeGrid(3);

    expect(areDotsConnectable(grid, 1, 2)).toBe(true);
    expect(areDotsConnectable(grid, 1, 4)).toBe(true);

    expect(areDotsConnectable(grid, 2, 1)).toBe(true);
    expect(areDotsConnectable(grid, 2, 3)).toBe(true);
    expect(areDotsConnectable(grid, 2, 5)).toBe(true);

    expect(areDotsConnectable(grid, 3, 2)).toBe(true);
    expect(areDotsConnectable(grid, 3, 6)).toBe(true);

    expect(areDotsConnectable(grid, 4, 1)).toBe(true);
    expect(areDotsConnectable(grid, 4, 5)).toBe(true);
    expect(areDotsConnectable(grid, 4, 7)).toBe(true);

    expect(areDotsConnectable(grid, 5, 2)).toBe(true);
    expect(areDotsConnectable(grid, 5, 4)).toBe(true);
    expect(areDotsConnectable(grid, 5, 6)).toBe(true);
    expect(areDotsConnectable(grid, 5, 8)).toBe(true);
  });

  it("returns false if dots are not connectable", () => {
    const grid = makeGrid(3);

    expect(areDotsConnectable(grid, 1, 5)).toBe(false);
    expect(areDotsConnectable(grid, 3, 5)).toBe(false);
    expect(areDotsConnectable(grid, 5, 9)).toBe(false);
    expect(areDotsConnectable(grid, 6, 7)).toBe(false);
    expect(areDotsConnectable(grid, 6, 8)).toBe(false);
  });
});

describe("User Interaction", () => {
  it("connects two dots", () => {
    const grid = makeGrid(3);
    const user = 1;
    const pointA = 5;
    const pointB = 3;
    const connected = connectDots(grid, {}, user, pointA, pointB);

    expect(connected).toEqual({
      "3-5": user
    });
  });

  it("does nothing if the two dots are already selected", () => {
    const grid = makeGrid(3);
    const user = 1;
    const pointA = 3;
    const pointB = 5;
    const connected = connectDots(grid, { "3-5": 2 }, user, pointA, pointB);

    expect(connected).toEqual({
      "3-5": 2
    });
  });

  it("does nothing if the user can not connect two dots", () => {
    const grid = makeGrid(3);
    const user = 1;
    const pointA = 1;
    const pointB = 7;
    const connected = connectDots(grid, {}, user, pointA, pointB);

    expect(connected).toEqual({});
  });
});
