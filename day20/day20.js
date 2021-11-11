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
const cleanTiles2 = buildEdgesV2(tilesRaw);
buildMatchedEdges(cleanTiles2);
const cornerTileKey = cornerTiles[0].tileKey;
buildMap(cleanTiles2, cornerTileKey);

function buildMap(tiles, tileKey) {
  const map = [];
  const mapWidth = Math.sqrt(tiles.length);
  const cornerTile = tiles.find((t) => t.tileKey === tileKey);
  const cornerTileOrientation = cornerTile.edges
    .filter((e) => !!e.matchedEdge)
    .map((e) => e.edgeType)
    .join("");
  switch (cornerTileOrientation) {
    case "03":
    case "30":
      transformTile(cornerTile, 180, false);
  }
}

function transformTile(tile, rotation, flip) {
  switch (rotation) {
    case 90:
      tile.edges.forEach((e) => (e.edgeType = (e.edgeType + 1) % 4));
      break;
    case 180:
      tile.edges.forEach((e) => (e.edgeType = (e.edgeType + 2) % 4));
      break;
    case 270:
      tile.edges.forEach((e) => (e.edgeType = (e.edgeType + 3) % 4));
      break;
  }
  switch (flip) {
    case "x":
      const tempTile = tile.edges.find((e) => e.edgeType === 0);
      tile.edges.find((e) => e.edgeType === 2).edgeType = 0;
      tempTile.edgeType = 2;
      tile.edges.filter((e) => [1, 3].includes());
  }

  console.log(tile.edges);
}

function buildMatchedEdges(tiles) {
  const edgeDictionary = tiles.reduce((a, b) => [...a, ...b.edges], []);
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
      edge: rows[lastIndex],
    };
    const edgeL = {
      tileKey,
      edgeType: 3,
      edge: edge1,
    };
    const edgeR = {
      tileKey,
      edgeType: 1,
      edge: edge2,
    };

    return {
      tileKey,
      edges: [edgeT, edgeB, edgeL, edgeR],
      tileData: rows,
    };
  });
}
