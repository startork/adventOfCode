const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const tilesRaw = text.split("\n\n");

//Part One
const tilesClean = buildEdges(tilesRaw);
const cornerTiles = tilesClean.filter(
  (tile) => numberOfMatches(tilesClean, tile.tileKey) < 3
);
const solution = cornerTiles.reduce((a, b) => a * +b.tileKey, 1);
console.log("Part 1: " + solution);

function numberOfMatches(tiles, tileKey) {
  const allEdges = tiles
    .filter((t) => t.tileKey !== tileKey)
    .map((t) => t.edges)
    .reduce((a, b) => [...a, ...b]);
  const edgesToCheck = [...tiles.filter((t) => t.tileKey === tileKey)[0].edges];
  edgesToCheck.forEach((edge) => {
    edgesToCheck.push(edge.split("").reverse().join(""));
  });
  return edgesToCheck.filter((e) => allEdges.includes(e)).length;
}

function buildEdges(rawTiles) {
  return rawTiles.map((tile) => {
    const [tileTitle, tileData] = tile.split(":\n");
    const rows = tileData.split("\n");
    const lastIndex = rows.length - 1;
    let edge1 = "";
    let edge2 = "";
    rows.forEach((row) => {
      edge1 += row[0];
      edge2 += row[lastIndex];
    });

    return {
      tileKey: tileTitle.split(" ")[1],
      edges: [rows[0], rows[lastIndex], edge1, edge2],
    };
  });
}

//Part Two (this is gonna be hard)
const mapWidth = Math.sqrt(tilesRaw.length);
const cleanTiles2 = buildEdgesV2(tilesRaw);
buildMatchedEdges(cleanTiles2);

const cornerTileKey = cornerTiles[0].tileKey;
let fullMap = buildMap(cleanTiles2, cornerTileKey);

const rowLength = fullMap.length;
const snakeRegex = new RegExp(
  `#(.{${rowLength - 18}})#(.{4})##(.{4})##(.{4})###(.{${
    rowLength - 18
  }})#(.{2})#(.{2})#(.{2})#(.{2})#(.{2})#`,
  "g"
);
const snakeReplacement = "O$1O$2OO$3OO$4OOO$5O$6O$7O$8O$9O$10O";

//Because this is an overlapping regex we need to do it multiple times
let snakeMap = findSnake(fullMap).join(":");
while (snakeRegex.test(snakeMap)) {
  snakeMap = snakeMap.replace(snakeRegex, snakeReplacement);
}
console.log("Part 2: " + snakeMap.match(/#/g).length);

function findSnake(map) {
  for (let i = 0; i < 4; i++) {
    if (snakeRegex.test(map.join(":"))) {
      return map;
    }
    map = map.map((s, index) =>
      map
        .map((t) => t[index])
        .reverse()
        .join("")
    );
  }
  map = map.map((s) => s.split("").reverse().join(""));
  for (let i = 0; i < 4; i++) {
    if (snakeRegex.test(map.join(":"))) {
      return map;
    }
    map = map.map((s, index) =>
      map
        .map((t) => t[index])
        .reverse()
        .join("")
    );
  }
  return null;
}

//Function to build the map
function buildMap(tiles, tileKey) {
  let map = [];
  let cornerTile = tiles.find((t) => t.tileKey === tileKey);
  const cornerTileOrientation = cornerTile.edges
    .filter((e) => !!e.matchedEdge)
    .map((e) => e.edgeType)
    .join("");

  //Make top right corner
  switch (cornerTileOrientation) {
    case "03":
    case "30":
      transformTile(cornerTile, 180, false);
      break;
    case "01":
    case "10":
      transformTile(cornerTile, 90, false);
      break;
    case "23":
    case "32":
      transformTile(cornerTile, 270, false);
  }

  //add corner to map ...IT BEGINS
  map = [...cornerTile.tileData];

  let recentTile = cornerTile;
  for (let i = 1; i < mapWidth; i++) {
    const matchedEdge = recentTile.edges.find(
      (e) => e.edgeType === 1
    ).matchedEdge;
    const flip = matchedEdge.flipped ? null : "x";
    recentTile = tiles.find((t) => t.tileKey === matchedEdge.tileKey);
    switch (matchedEdge.edgeType) {
      case 0:
        transformTile(recentTile, 270, flip);
        break;
      case 1:
        transformTile(recentTile, 180, flip);
        break;
      case 2:
        transformTile(recentTile, 90, flip);
        break;
      case 3:
        transformTile(recentTile, 0, flip);
        break;
    }
    map = map.map((s, index) => (s += recentTile.tileData[index]));
  }

  //First row done!! it's time to loop until the map is complete
  for (let i = 1; i < mapWidth; i++) {
    const matchedEdge = cornerTile.edges.find(
      (e) => e.edgeType === 2
    ).matchedEdge;
    const flip = matchedEdge.flipped ? null : "y";
    cornerTile = tiles.find((t) => t.tileKey === matchedEdge.tileKey);
    switch (matchedEdge.edgeType) {
      case 1:
        transformTile(cornerTile, 270, flip);
        break;
      case 2:
        transformTile(cornerTile, 180, flip);
        break;
      case 3:
        transformTile(cornerTile, 90, flip);
        break;
      case 0:
        transformTile(cornerTile, 0, flip);
        break;
    }

    let newMap = cornerTile.tileData;
    let recentTile = { ...cornerTile };
    for (let j = 1; j < mapWidth; j++) {
      const matchedEdge = recentTile.edges.find(
        (e) => e.edgeType === 1
      ).matchedEdge;
      const flip = matchedEdge.flipped ? null : "x";
      recentTile = tiles.find((t) => t.tileKey === matchedEdge.tileKey);
      switch (matchedEdge.edgeType) {
        case 0:
          transformTile(recentTile, 270, flip);
          break;
        case 1:
          transformTile(recentTile, 180, flip);
          break;
        case 2:
          transformTile(recentTile, 90, flip);
          break;
        case 3:
          transformTile(recentTile, 0, flip);
          break;
      }
      newMap = newMap.map((s, index) => (s += recentTile.tileData[index]));
    }

    map = [...map, ...newMap];
  }

  return map;
}

function transformTile(tile, rotation, flip) {
  switch (rotation) {
    case 270:
      rotateTile(tile);
    case 180:
      rotateTile(tile);
    case 90:
      rotateTile(tile);
      break;
  }

  switch (flip) {
    case "x":
      const tempTileX = tile.edges.find((e) => e.edgeType === 0);
      tile.edges.find((e) => e.edgeType === 2).edgeType = 0;
      tempTileX.edgeType = 2;
      tile.edges
        .filter((e) => [1, 3].includes(e.edgeType))
        .forEach((e) => {
          e.edge = e.edge.split("").reverse().join("");
        });
      tile.edges.forEach((e) => {
        if (e.matchedEdge) {
          e.matchedEdge.flipped = !e.matchedEdge.flipped;
        }
      });
      tile.tileData.reverse();
      break;
    case "y":
      const tempTileY = tile.edges.find((e) => e.edgeType === 1);
      tile.edges.find((e) => e.edgeType === 3).edgeType = 1;
      tempTileY.edgeType = 3;
      tile.edges
        .filter((e) => [0, 2].includes(e.edgeType))
        .forEach((e) => {
          e.edge = e.edge.split("").reverse().join("");
        });
      tile.edges.forEach((e) => {
        if (e.matchedEdge) {
          e.matchedEdge.flipped = !e.matchedEdge.flipped;
        }
      });
      tile.tileData = tile.tileData.map((s) => s.split("").reverse().join(""));
      break;
  }

  function rotateTile(tileRotate) {
    tileRotate.edges.forEach((e) => (e.edgeType = (e.edgeType + 1) % 4));
    tileRotate.tileData = tileRotate.tileData.map((s, index) =>
      tileRotate.tileData
        .map((t) => t[index])
        .reverse()
        .join("")
    );
  }
}

function buildMatchedEdges(tiles) {
  //seriously!?!?! why so deep the references :(
  const edgeDictionary = tiles.reduce(
    (a, b) => [
      ...a,
      ...b.edges.map((e) => {
        return { ...e };
      }),
    ],
    []
  );

  tiles.forEach((tile) => {
    const newDict = edgeDictionary.filter((e) => e.tileKey !== tile.tileKey);
    tile.edges.forEach((edge) => {
      const matchedEdge = newDict.find((e) => e.edge === edge.edge);
      if (matchedEdge) {
        edge.matchedEdge = { ...matchedEdge, flipped: false };
      } else {
        const flipEdge = edge.edge.split("").reverse().join("");
        const matchedFlippedEdge = newDict.find((e) => e.edge === flipEdge);
        if (matchedFlippedEdge) {
          edge.matchedEdge = {
            ...matchedFlippedEdge,
            flipped: true,
          };
        } else {
          edge.matchedEdge = null;
        }
      }
    });
  });
}

function buildEdgesV2(rawTiles) {
  return rawTiles.map((tile) => {
    const [tileTitle, tileData] = tile.split(":\n");
    const tileKey = tileTitle.split(" ")[1];
    const rows = tileData.split("\n");
    const lastIndex = rows.length - 1;
    let edge1 = "";
    let edge2 = "";
    rows.forEach((row) => {
      edge1 += row[0];
      edge2 += row[lastIndex];
    });

    const edgeT = {
      tileKey,
      edgeType: 0,
      edge: rows[0],
    };
    const edgeB = {
      tileKey,
      edgeType: 2,
      edge: rows[lastIndex].split("").reverse().join(""),
    };
    const edgeL = {
      tileKey,
      edgeType: 3,
      edge: edge1.split("").reverse().join(""),
    };
    const edgeR = {
      tileKey,
      edgeType: 1,
      edge: edge2,
    };

    return {
      tileKey,
      edges: [edgeT, edgeB, edgeL, edgeR],
      tileData: rows
        .map((r) => r.substring(1, r.length - 1))
        .slice(1, rows.length - 1),
    };
  });
}
