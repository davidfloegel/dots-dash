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
