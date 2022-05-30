/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline()); // Number of elements which make up the association table.
const Q = parseInt(readline()); // Number Q of file names to be analyzed.

let base_ext = new Object();

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const EXT = inputs[0].toLowerCase(); // file extension
    const MT = inputs[1]; // MIME type.
    if (Object.hasOwnProperty(base_ext, EXT) == false){
        base_ext[EXT] = MT;
    }
}
let answer = "";
for (let i = 0; i < Q; i++) {
    const FNAME = readline(); // One file name per line.
    const ending_arr = FNAME.toLowerCase().split(".");
    const end = ending_arr.length > 1 ? ending_arr.length - 1 : 1;
    if (end > 0 && base_ext.hasOwnProperty(ending_arr[end])){
        answer = (base_ext[ending_arr[end]]);
    } else {
        answer = "UNKNOWN";
    }
    console.log(answer);
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');


// For each of the Q filenames, display on a line the corresponding MIME type. If there is no corresponding type, then display UNKNOWN.