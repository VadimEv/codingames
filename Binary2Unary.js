/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const MESSAGE = readline();
// turn string into 7 bit binary padding with 0 when needed
const textToBinary = (str) => {
    let res = '';
    res = str.split('').map(char => char.charCodeAt(0).toString(2).padStart(7, '0')).join('');
    return res;
 };
// Write an answer using console.log()
// To debug: console.error('Debug messages...');
let ans = textToBinary(MESSAGE);

// turn binary into array of strings of only 1s or 0s, in regex \d === [0-9]
const count = (str) => {
    return str.toString().match(/(\d)\1*/g);
}

let answ = count(ans);

// turn arrays into respective 0 only arrays

let answe = answ.map(el => el[0] === '1' ? '0 ' + '0'.repeat(el.length) + ' ': '00 ' + '0'.repeat(el.length) + ' ' );

// turn array of strings into single string

let answer = answe.join('').trim();
console.log(answer);
