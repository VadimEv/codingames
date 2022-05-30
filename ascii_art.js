/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const L = parseInt(readline());
const H = parseInt(readline());
const T = readline().toUpperCase();
for (let i = 0; i < H; i++) {
    const ROW = readline();
    var line = "";
    for (let j = 0; j < T.length; j++){
        var ascIndex = T.charCodeAt(j) - 65;
        if (ascIndex < 0 || ascIndex > 26) {
            ascIndex = 26;
        }
    line += ROW.substring(ascIndex*L, (ascIndex + 1) * L);
    }
    console.log(line);
}
// Write an answer using console.log()
// To debug: console.error('Debug messages...');
