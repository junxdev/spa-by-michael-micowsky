/*
 * 2.5.1 프로토타입 체인
 */

var proto = {
    sentence : 4,
    probation : 6
}

var makePrisoner = function(name, id) {
    var prisoner = Object.create(proto);
    prisoner.name = name;
    prisoner.id = id;

    return prisoner
}

var firstPrisoner = makePrisoner('John', '12A');

console.log(firstPrisoner); // name, id
console.log(firstPrisoner.sentence); // 프로토타입의 sentence
console.log(firstPrisoner.__proto__); // sentence, probation
console.log(firstPrisoner.__proto__.__proto__); // Object
console.log(firstPrisoner.__proto__.__proto__.__proto__); // null
// console.log(firstPrisoner.__proto__.__proto__.__proto__.__proto__); // cannot read property '__proto__' of null

/*
 * 2.11 프로토타입 객체 덮어쓰기
 */

 // 속성값 덮어쓰기
firstPrisoner.sentence = 10;
console.log(firstPrisoner.sentence); // 10
console.log(firstPrisoner.__proto__.sentence); // 4

delete firstPrisoner.sentence;
console.log(firstPrisoner.sentence); // 4

// 프로토타입 수정
proto.sentence = 5;
console.log(firstPrisoner.sentence); // 5