/*
 * spa.js
 * 루트 네임스페이스 모듈
 */

/*jslint            browser : true, continue : true,
  devel   : true,   indent : 2,     maxerr : 50,
  newcap  : true,   nomen : true,   plusplus : true,
  regexp  : true,   sloppy : true,  vars : false,
  white   : true
*/

var spa = (function() {
    var initModule = function(container) {
        container.innerHTML = '<h1 style="display:inline-block; margin:25px;">'
        + 'hello world!'
        + '</h1>';
    };
    return {initModule : initModule};
}());