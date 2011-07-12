var MAX_ATOMS = 10,
    TOTAL_ATOMS = 300,
    MAX_CYCLES = 10000,
    cycleMark = MAX_CYCLES / 100,
    MAX_REPLICATORS = 500;

var Atom = require('./atom'),
    Replicator = require('./replicator');

var atoms = [],
    replicators = [],
    cycle = 0,
    start;

function fillWithAtoms(arr, max) {
    while (arr.length < max) {
        arr.push(new Atom(30 + Math.floor(Math.random()*8)));
    }
}

function getReplicatorAtomPrimer() {
    var val = extract(atoms, MAX_ATOMS);
    fillWithAtoms(atoms, TOTAL_ATOMS);
    return val;
}

function extract(arr, num) {
    var result = [], i;
    for (i=0; i<num; i++) {
        result.push(arr.pop());
    }
    return result;
}

fillWithAtoms(atoms, TOTAL_ATOMS);

replicators.push(new Replicator(getReplicatorAtomPrimer()));

console.log('Starting replicator:');
console.log(replicators[0].toString());

start = lastStep = new Date().getTime();

while (cycle < MAX_CYCLES) {
    if (cycle % cycleMark === 0) {
        console.log('cycle ' + cycle + ', replicators: '
                + replicators.length
                + ' (time since last step: '
                + (new Date().getTime() - start) + ')');
    }
    var newRepls = {};
    replicators.forEach(function(repl, i) {
        var clone = repl.replicate(getReplicatorAtomPrimer());
        if (clone) {
            newRepls[i] = clone;
        }
    });

    Object.keys(newRepls).forEach(function(i) {
        replicators.splice(i, 0, newRepls[i]);
    });

    if (replicators.length > MAX_REPLICATORS) {
        console.log('busted max replicator count after ' + cycle + ' cycles');
        cycle = MAX_CYCLES;
    }

    cycle++

}

console.log('After ' + MAX_CYCLES + ' cycles...');
console.log('END STATE: ' + replicators.length + ' replicators');
replicators.forEach(function(repl) {
    console.log(repl.toString());
});