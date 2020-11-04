// JavaScript 객체와 프로토타입 체인

var proto = {
    sentence : 4,
    probation : 2
};

var Prisoner = function(name, id) {
    this.name = name;
    this.id = id;
}

Prisoner.prototype = proto;

var firstPrisoner = new Prisoner('Joe', '12A');
var secondPrisoner = new Prisoner('Sam', '2BC');

console.log(firstPrisoner)
console.log(secondPrisoner)

// 2.9
var proto = {
    sentence : 4,
    probation : 2
};

var firstPrisoner = Object.create(proto);
firstPrisoner.name = 'Joe2';
firstPrisoner.id = '12A2'
var secondPrisoner = Object.create(proto);
secondPrisoner.name = 'Sam2';
secondPrisoner.id = '2BC2'

console.log(firstPrisoner)
console.log(secondPrisoner)

// 2.10

var proto = {
    sentence : 4,
    probation : 2
};

var makePrisoner = function(name, id) {
    var prisoner = Object.create(proto);
    prisoner.name = name;
    firstPrprisonerisoner.id = id;

    return Prisoner;
}

var firstPrisoner = makePrisoner('Joe', '12A');
var secondPrisoner = makePrisoner('Sam', '2BC');

console.log(firstPrisoner)
console.log(secondPrisoner)