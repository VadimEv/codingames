/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis
const matrix = [...Array(height)].map(readline);
for (let y1 = 0; y1 < height; y1++) {
   for (let x1 = 0; x1 < width; x1++){
   let [x2, y2, x3, y3 ] = [-1,-1,-1,-1];
       if ("." == matrix[y1].charAt(x1)) {
         continue;
       }
       // right neighboor
       const nX = +(matrix[y1].slice(x1 + 1).indexOf("0") + 1);
       x2 = (nX && x1 + 1 < width) ? nX + x1 : "-1";
       //down neighboor
       for ( let i = y1 + 1; i < height; i++){
            if ("0" == matrix[i].charAt(x1)) {
                y3 = i;
                break;
            }
       }
       y2 = ("-1" != x2) ? y1: "-1" ;
       x3 = ("-1" != y3) ? x1: "-1" ;
       console.log(x1, y1, x2, y2, x3, y3);
    }
}
// Write an action using console.log()
// To debug: console.error('Debug messages...');


// Three coordinates: a node, its right neighbor, its bottom neighbor
