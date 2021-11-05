const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const tilesRaw = text.split("\n\n");

//Part One
const tilesClean = buildEdges(tilesRaw);
const cornerTiles = tilesClean.filter(tile => numberOfMatches(tilesClean, tile.tileKey) < 3)
const solution = cornerTiles.reduce((a,b) => a * +b.tileKey, 1);
console.log('Part 1: ' + solution);

function numberOfMatches(tiles, tileKey) {
    const allEdges = tiles.filter(t => t.tileKey !== tileKey).map(t => t.edges).reduce((a, b) => [...a, ...b]);
    const edgesToCheck = [...tiles.filter(t => t.tileKey === tileKey)[0].edges];
    edgesToCheck.forEach(edge => {
        edgesToCheck.push(edge.split("").reverse().join(""));
    })
    return edgesToCheck.filter(e => allEdges.includes(e)).length
}

function buildEdges(rawTiles) {
    return rawTiles.map(tile => {
        const [tileTitle, tileData] = tile.split(':\n');
        const rows = tileData.split('\n');
        const lastIndex = rows.length - 1; 
        let edge1 = '';
        let edge2 = '';
        rows.forEach(row => {
            edge1 += row[0];
            edge2 += row[lastIndex]
        });

        return {
            tileKey: tileTitle.split(' ')[1],
            edges: [rows[0], rows[lastIndex], edge1, edge2]
        };
    });
}

//Part Two (this is gonna be hard)
const cleanTiles2 = buildEdgesV2(tilesRaw);
const cornerTileKey = cornerTiles[0].tileKey;
buildMap(cleanTiles2, cornerTileKey);
console.log(cornerTiles)
function buildMap(tiles, tileKey) {
    map = [];
    console.log(matchedEdges(tiles, '2797'));
}

function matchedEdges(tiles, tileKey) {
    const edgesToCheck = [...tiles.filter(t => t.tileKey === tileKey)[0].edges.reduce((a,b) => [...a, b.edge], [])];
    const stdOrientn = tiles.filter(t => {
        return t.tileKey !== tileKey && t.edges.some(e => edgesToCheck.includes(e.edge))
    }).map(t => {
        const matched = t.edges.filter(e => edgesToCheck.includes(e.edge))[0];
        return {
            tileKey: t.tileKey, 
            edgeType: matched.edgeType 
        };
    });
    
    const flippedEdges = edgesToCheck.map(edge => edge.split("").reverse().join(""));
    const flipped = console.log(tiles.filter(t => {
        return t.tileKey !== tileKey && t.edges.some(e => flippedEdges.includes(e.edge))
    }))
    

    return [...stdOrientn, ...flipped]
}


function buildEdgesV2(rawTiles) {
    return rawTiles.map(tile => {
        const [tileTitle, tileData] = tile.split(':\n');
        const rows = tileData.split('\n');
        const lastIndex = rows.length - 1; 
        let edge1 = '';
        let edge2 = '';
        rows.forEach(row => {
            edge1 += row[0];
            edge2 += row[lastIndex]
        });

        const edgeT = {
            edgeType: 'T',
            edge: rows[0],
        }
        const edgeB = {
            edgeType: 'B',
            edge: rows[0],
        }
        const edgeL = {
            edgeType: 'L',
            edge: edge1
        }
        const edgeR = {
            edgeType: 'R',
            edge: edge2
        }

        return {
            tileKey: tileTitle.split(' ')[1],
            edges: [edgeT, edgeB, edgeL, edgeR],
            tileData: rows
        };
    });
}