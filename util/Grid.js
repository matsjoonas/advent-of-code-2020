class Grid {
  constructor(config) {
    this.grid = config.grid;
    this.startingPosition = config.startingPosition;
    this.currentPosition = this.startingPosition;
    this.lineOfSightBlockers = config.lineOfSightBlockers;
    this.gridSize = [this.grid[0].length, this.grid.length];
  }

  isOnGrid(position) {
    if (position[0] < 0 || position[1] < 0) {
      return false;
    }
    return (position[0] < this.gridSize[0] && position[1] < this.gridSize[1]);
  }

  isVisionBlocking(unit) {
    return this.lineOfSightBlockers.includes(unit);
  }

  getUnitAt(position) {
    if (!this.isOnGrid(position)) {
      return undefined;
    } else {
      return this.grid[position[1]][position[0]]
    }
  }

  look(step, position = this.currentPosition) {
    const nextPosition = [
      position[0] + step[0],
      position[1] + step[1],
    ];

    const nextUnit = this.getUnitAt(nextPosition);
    if (this.isVisionBlocking(nextUnit) || nextUnit === undefined) {
      return nextUnit;
    } else {
      return this.look(step, nextPosition);
    }
  }

  move() {
  }

}

module.exports = Grid;
