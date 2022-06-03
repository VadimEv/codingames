/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
let horseStrength = new Array(N);
for (let i = 0; i < N; i++) {
    const pi = parseInt(readline());
    horseStrength[i] = pi;
}
let sortedStr = horseStrength.sort((a, b) => a - b );
let delta = sortedStr.map((el, i, arr) => Math.abs(el - arr[i + 1])).sort((a, b) => a - b );
// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(delta[0]);
