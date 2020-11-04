// JavaScript 객체와 프로토타입 체인

/*
 * 2.8
 * 프로토타입 기반의 객체 생성
 */ 

// 객체 템플릿 생성
var proto = { 
    sentence : 4,
    probation : 2
};

// 생성자 선언
var Prisoner = function(name, id) {
    this.name = name;
    this.id = id;
}

// 생성자와 프로토타입 연결
Prisoner.prototype = proto;

// 객체 생성
var firstPrisoner = new Prisoner('Joe', '12A');
var secondPrisoner = new Prisoner('Sam', '2BC');

console.log(firstPrisoner)
console.log(secondPrisoner)

/* 
 * 2.9
 * new 연산자 대신 Object.create 메서드 사용
 */ 

// 프로토타입 생성
var proto = {
    sentence : 4,
    probation : 2
};

// 메서드에 프로토타입 객체 전달
var firstPrisoner = Object.create(proto);
firstPrisoner.name = 'Joe2';
firstPrisoner.id = '12A2'
var secondPrisoner = Object.create(proto);
secondPrisoner.name = 'Sam2';
secondPrisoner.id = '2BC2'

console.log(firstPrisoner)
console.log(secondPrisoner)

/* 
 * 2.10
 * 팩토리 함수 사용
 */

// 프로토타입 생성
var proto = {
    sentence : 4,
    probation : 2
};

// 팩토리 함수 선언
var makePrisoner = function(name, id) {
    var prisoner = Object.create(proto);
    prisoner.name = name;
    prisoner.id = id;

    return prisoner;
}

// 객체 생성
var firstPrisoner = makePrisoner('Joe', '12A');
var secondPrisoner = makePrisoner('Sam', '2BC');

console.log(firstPrisoner)
console.log(secondPrisoner)

// Object.create()를 지원하지 않는 경우(ex. ~ IE8)
var ObjectCreate = function(arg) {
    if(!arg) {return {};}
    function obj() {};
    obj.prototype = arg;
    return new obj;
}

Object.create = Object.create || ObjectCreate;