function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16).toUpperCase();
}

function Atom(state) {
    this.state = state || randomColor();
}

Atom.prototype = {
    toString: function() {
        return this.state;
    }
};

module.exports = Atom;