var regular_joe = 'I am global!';
function prison() {
    var prisoner = 'I am local!';

    prisoner_1 = 'I have escaped!';
    var prisoner_2 = 'I am locked in!';
}

prison();
console.log(regular_joe);
// console.log(prisoner); ReferenceError: prisoner is not defined
console.log(prisoner_1);
// console.log(prisoner_2); ReferenceError: prisoner_2 is not defined

// worst one
function loop() {
    for(i = 0; i < 10; i++) {
        //
    }
}
loop();
console.log(i);
delete i;

// not bad one
function loop() {
    for(var i  = 0; i < 10; i++) {
        //
    }
}
loop()
// console.log(i); ReferenceError: i is not defined

// best one
function loop() {
    var i;
    for(i = 0; i < 10; i++) {
        //
    }
}
loop()
// console.log(i); ReferenceError: i is not defined

function prison() {
    var prisoner = 'I am local!',
        warden   = 'I am local too!',
        guards   = 'I am local three!'
    ;
}