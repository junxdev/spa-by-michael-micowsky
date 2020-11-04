// 자바스크립트 엔진의 코드 처리 순서
// 2.2
function myFunction(arg1, arg2) { // 1. 함수 인자를 선언하고 초기화
    var local_var = 'foo', // 2. 지역 변수를 선언하지만 초기화하지는 않음
        a_function = function() {
            console.log('a function');
        };
    function inner() { // 3. 함수를 선언하고 초기화
        console.log('inner');
    }        
}

myFunction(1, 2)

// 2.4
var regular_joe = 'regular_joe is assigned';
function prison(regular_joe) {
    console.log(regular_joe);
    var regular_joe = 'regular_joe is asigned locally';

    console.log(regular_joe); // 로컬 변수가 선언되지 않으면 전역 변수를 사용
}

prison(regular_joe);

// 2.5
outer(1)

function outer(arg) {
    var local_var = 'foo';
    function inner() {
        console.log('inner');
    }
    console.log(arg)
    inner();
}