// 스코프 체인

// 2.7
var regular_joe = 'I am here to save the day!';

console.log(regular_joe);
function supermax() {
    var regular_joe = 'regular_joe is assigned';
    console.log(regular_joe);
    function prison() {
        var regular_joe;
        console.log(regular_joe); // undefined
    }
    prison();
}
supermax();

// 2.8
var regular_joe = 'I am here to save the day!';

console.log(regular_joe);
function supermax() {
    console.log(regular_joe);
    function prison() {
        console.log(regular_joe); // 셋 다 같은 값을 출력
    }
    prison();
}
supermax();