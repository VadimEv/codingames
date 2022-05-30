/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const LON = readline();
const LAT = readline();
const N = parseInt(readline());

// function to translate degrees to radians
const d2r = (x) => {
    return x * (Math.PI / 180);
}

const uLon = d2r(parseFloat(LON.replace(",", ".")));
const uLat = d2r(parseFloat(LAT.replace(",", ".")));
//console.error(uLon, uLat);

let answer = Number.MAX_VALUE;
let adress = '';
for (let i = 0; i < N; i++) {
    const DEFIB = readline();
    // extract coords of defibrilator
    const coords = DEFIB.split(';')[4];
    const dLon = d2r(parseFloat(DEFIB.split(';')[4].replace(",", ".")));
    const dLat = d2r(parseFloat(DEFIB.split(';')[5].replace(",", ".")));
    const dx = (dLon - uLon) * Math.cos((dLat + uLat)/2);
    const dy = (dLat - uLat);
    const distance = 6371 * Math.sqrt(dx*dx + dy*dy);
    if (distance < answer) {
        answer = distance;
        adress = DEFIB.split(';')[1];
    }
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(adress);
