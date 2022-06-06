class Map {
    constructor(nb_nodes) {
        this.nodes = [];
        for (let i = 0; i < nb_nodes; i++) {
            this.nodes.push({index: i, links: [],
             isExit: false, isCut: false})
        }
    }
    addLink(link) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].index == link.N1) {
                this.nodes[i].links.push(link.N2)
            }
            if (this.nodes[i].index == link.N2) {
                this.nodes[i].links.push(link.N1)
            }
        } 
    }
    addExits(exitIndex) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].index == exitIndex) {
                this.nodes[i].isExit = true
            }
        }
    }
    displayMap() {
        for (let i = 0; i < this.nodes.length; i++) {
            console.error(this.nodes[i])
        } 
    }
    cut(link) {
        let index = this.nodes[link.N1].links.indexOf(link.N2);
        if (index > -1) {
            this.nodes[link.N1].links.splice(index, 1);
        }
        index = this.nodes[link.N2].links.indexOf(link.N1);
        if (index > -1) {
            this.nodes[link.N2].links.splice(index, 1);
        }
        console.log(link.N1 + " " + link.N2);
    }
    searchClosestExitLink(pos) {
        let childNodes = [];
        childNodes.push(this.nodes[pos]);
        while(childNodes.length > 0) {
            let currentNode = childNodes.shift();
            for (let i = 0; i < currentNode.links.length; i++) {
                childNodes.push(this.nodes[currentNode.links[i]]);
                if (this.nodes[currentNode.links[i]].isExit) {
                    return ({N1: currentNode.index, N2: this.nodes[currentNode.links[i]].index})
                }
            }
        }
        return "NO EXIT LINK"
    }
    inDanger(pos) {
        let childNodes = [];
        childNodes.push(this.nodes[pos]);
        let currentNode = childNodes.shift();
        for (let i = 0; i < currentNode.links.length; i++) {
            childNodes.push(this.nodes[currentNode.links[i]]);
            if (this.nodes[currentNode.links[i]].isExit) {
                return true;
            }
        }
        return false;
    }
    searchBiggestStar() {
        let starIndex = 0;
        let nbLink = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].isExit) {
                if (this.nodes[i].links.length > nbLink) {
                    nbLink = this.nodes[i].links.length;
                    starIndex = i;
                }
            }
        }
        return starIndex;
    }
    searchStarEntrance(index) {
        let linkedNodes = [];
        linkedNodes.push(index);
        let outerNodes = [];
        let innerNodes = [];
        for (let i = 0; i < this.nodes[index].links.length; i++) {
            linkedNodes.push(this.nodes[index].links[i]);
        }
        for (let i = 0; i < this.nodes[index].links.length; i++) {
            if (this.isInnerNode(this.nodes[index].links[i], linkedNodes)) {
                innerNodes.push(this.nodes[index].links[i]);
            } else {
                outerNodes.push(this.nodes[index].links[i]);
            }
        }
        let isThereAnyEntrance = false;
        let entranceInner = 0;
        let entranceOuter = 0;
        for (let i = 0; i < innerNodes.length; i++) {
            let isLinkedToOuterNode = this.isLinkedToOuterNode(innerNodes[i], outerNodes);
            if (isLinkedToOuterNode != false) {
                isThereAnyEntrance = true;
                entranceInner = innerNodes[i];
                entranceOuter = isLinkedToOuterNode;
            }
        }
        return {isThereAnyEntrance: isThereAnyEntrance, entranceIndex: {N1: entranceInner, N2: entranceOuter}};
    }
    isLinkedToOuterNode(nodeIndex, outerNodes) {
        for (let i = 0; i < this.nodes[nodeIndex].links.length; i++) {
            if (outerNodes.includes(this.nodes[nodeIndex].links[i])) {
                return this.nodes[nodeIndex].links[i];
            }
        }
        return false;
    }
    isInnerNode(nodeIndex, linkedNodes) {
        let isInnerNode = true;
        for (let i = 0; i < this.nodes[nodeIndex].links.length; i++) {
            if (!linkedNodes.includes(this.nodes[nodeIndex].links[i])) {
                isInnerNode = false;
            }
        }
        return isInnerNode;
    }
}

var inputs = readline().split(' ');
const nb_nodes = parseInt(inputs[0]);
const nb_links = parseInt(inputs[1]);
const nb_exits = parseInt(inputs[2]);

let m = new Map(nb_nodes);

for (let i = 0; i < nb_links; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]);
    const N2 = parseInt(inputs[1]);
    m.addLink({N1: N1, N2: N2})
}

for (let i = 0; i < nb_exits; i++) {
    const EI = parseInt(readline());
    m.addExits(EI)
}

// m.displayMap()

//console.error(m.searchStarEntrance(m.searchBiggestStar()));

while (true) {
    const SI = parseInt(readline());
    if (!m.inDanger(SI)) {
        let e = m.searchStarEntrance(m.searchBiggestStar());
        if (e.isThereAnyEntrance) {
            m.cut(e.entranceIndex);
        } else {
            m.cut(m.searchClosestExitLink(SI))
        }
    } else {
        m.cut(m.searchClosestExitLink(SI))
    }
    // m.cut({N1: 2, N2: 1})
    // m.displayMap()
}
