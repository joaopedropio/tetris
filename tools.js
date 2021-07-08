function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function cloneBlock(block) {
    let clonedBlock = new Block(block.spins, block.mapSize);
    clonedBlock.id = block.id;
    clonedBlock.currentSpin = block.currentSpin;
    clonedBlock.x = block.x;
    clonedBlock.y = block.y;

    return clonedBlock;
}

function cloneSquare(square) {
  return {
      empty: square.empty,
      color: square.color
  }
}

function cloneMap(map) {
  if (map == undefined || map.length == 0)
      return undefined;

  const x = map.length;
  const y = map[0].length;
  let clone = createMap(null, x, y)

  for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
          let square = map[i][j];
          clone[i][j] = cloneSquare(square);
      }   
  }
  return clone;
}