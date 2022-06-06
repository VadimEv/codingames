/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways

let paths = {};
let gates = [];

for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
    // paths form: "node index" : [ neighboor array, conencted nodes]
    if ( typeof paths[N1] !== 'undefined' ) {
        paths[N1].push(N2)
    } else {
        paths[N1] = [N2];
    }

    if ( typeof paths[N2] !== 'undefined' ) {
        paths[N2].push(N1)
    } else {
        paths[N2] = [N1];
    }
}
for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
    gates[i] = EI;
}

function runThroughNet(SI, path = []) {
    let result = [];
    let siNetLen = paths[SI].length;
    path.push(SI);
    for(let i = 0; i < siNetLen; i++) {
        let node = paths[SI][i];
        let tmpPath = JSON.parse(JSON.stringify(path)); // JSON.stringify then JSON.parse to clone the object
        if (gates.indexOf(node) === -1 && path.indexOf(node) === -1) {
            let tmpResult = runThroughNet(node, tmpPath);
            result = result.concat(tmpResult);
        } else if (gates.indexOf(node) !== -1) {
            tmpPath.push(node);
            result.push(tmpPath);
        }
    }
    return result;
}

function getFastestGatewayPath(SI) {
    let result = runThroughNet(SI);
    result.sort(function(a, b) {
        return a.length > b.length ? 1 : -1;
    });
    return result[0];
}


// game loop
while (true) {
    var SI = parseInt(readline());
    var result = getFastestGatewayPath(SI);
    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    console.log(result[0] + " " + result[1]);
}
