type Color = "aqua" | "blue" | "orange" | "yellow" | "lime" | "fuchsia" | "red" | "black";
type uuid = string;

function uuidv4(): uuid {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function cloneBlock(block: Block): Block {
    let clonedBlock = new Block(block.spins, block.mapSize, block.name);
    clonedBlock.id = block.id;
    clonedBlock.currentSpin = block.currentSpin;
    clonedBlock.x = block.x;
    clonedBlock.y = block.y;

    return clonedBlock;
}

function cloneSquare(square: Square): Square {
  return {
      empty: square.empty,
      color: square.color
  }
}

function emptyMap(): Board {
    let map = [];
    map[0] = [];
    return map;
}

function cloneBoard(map: Board): Board {
  if (map == undefined || map.length == 0)
      return emptyMap();

  const x = map.length;
  const y = map[0].length;
  let clone = createMap({empty: false, color: "black"}, x, y)

  for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
          let square = map[i][j];
          clone[i][j] = cloneSquare(square);
      }   
  }
  return clone;
}

function printMapDebbug(map: Board): void {
    let mapWidth = map.length;
    let mapHeight = map[0].length;

    for (let y = mapHeight - 1; y >= 0; y--) {
        let row = "";
        for (let x = 0; x < mapWidth; x++) {
            if (map[x][y].color == "black") {
                row += "-";
            } else {
                row += map[x][y].color[0];
            }
        }
        console.log(row);
    }
}
