var REPLICATION_CHANCE = 1.0;
var MUTATION_CHANCE = 0.1;

var Atom = require('./atom');

function Replicator(atoms) {
    this.atoms = atoms;
}

Replicator.prototype = {

    replicate: function(atoms) {
        var self = this,
            i, match = [], foundSomething;
        if (atoms.length < this.atoms.length) {
            return;
        }
        for (i=0; i<this.atoms.length; i++) {
            match.push(null);
        }
        atoms.forEach(function(atomIn, indexIn) {
            var used = false;
            self.atoms.forEach(function(atom, index) {
                if (!used && !match[index] && atomIn.state == atom.state) {
                    match[index] = atomIn;
                    used = true;
                    foundSomething = true;
                }
            });
        });
        if (!foundSomething) { return; }
        for (i=0; i<match.length; i++) {
            if (match[i] === null) {
                return;
            }
        }
        if (Math.random() > REPLICATION_CHANCE) {
            return;
        }
        if (Math.random() < MUTATION_CHANCE) {
            match = mutateAtom(match);
        }
        return new Replicator(match);
    },

    toString: function() {
        var out = '';
        this.atoms.forEach(function(a) {
            out += stylize('█', a.state);
        });
        return out;
    }

};

function mutateAtom(atoms) {
    var index = Math.floor(Math.random() * atoms.length);
    atoms[index] = new Atom(30 + Math.floor(Math.random()*8));
    return atoms;
}

function stylize(str, style) {
  return '\u001b[' + style + 'm' + str + '\u001b[39m';
}

module.exports = Replicator;