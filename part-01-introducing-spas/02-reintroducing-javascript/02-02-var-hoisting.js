function prison() {
    console.log(prisoner); // undefined
    var prisoner, warden, guards;
    console.log(prisoner);
    prisoner = 'prisoner assigned';
    console.log(prisoner);
}
prison();

var regular_joe = 'regular_joe is assigned';
function joe() {
    console.log(regular_joe); // undefined
    var regular_joe;
}
joe();